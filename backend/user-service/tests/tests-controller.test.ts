process.env.NODE_ENV = 'test';

import request from "supertest";
import { app } from "../src/index";
import { User } from "../src/models/User";
import axios from "axios";
import mongoose from 'mongoose';
import { Server } from 'http';

// Mocking the necessary modules
jest.mock('../Logger/logger', () => ({
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../src/models/User");
jest.mock("../src/services/tokenService", () => ({
    generateAccessToken: jest.fn(() => "mocked_token")
}));
jest.mock("axios");

let testServer: Server;

beforeAll((done: jest.DoneCallback) => {
  testServer = app.listen(0, done);  // random available port clearly
});

afterAll(async () => {
  await mongoose.disconnect();
  testServer.close();
}, 10000);

describe("User Controller - login", () => {
  test("should login successfully with valid credentials", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({ _id: "123", username: "George123" });

    const response = await request(testServer)
      .post("/api/user/login")
      .send({ username: "George123", password: "0000" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Login successful" });
  });

  test("should return 400 if user not found", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    const response = await request(testServer)
      .post("/api/user/login")
      .send({ username: "never", password: "ever" });

    expect(response.status).toBe(400);
  });
});

describe("User Controller - signup", () => {
  test("should create a new user successfully", async () => {
    (User.exists as jest.Mock).mockResolvedValue(false);
    (User.create as jest.Mock).mockResolvedValue({ _id: "123" });

    const response = await request(testServer)
      .post("/api/user/signup")
      .send({
        username: "newuser",
        password: "securePass",
        name: "John",
        lastname: "Doe",
        age: 25,
        isAdmin: false,
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "User Successfully created!" });
  });

  test("should return 400 if username is taken", async () => {
    (User.exists as jest.Mock).mockResolvedValue({ _id: new mongoose.Types.ObjectId() });

    const response = await request(testServer)
      .post("/api/user/signup")
      .send({
        username: "existingUser",
        password: "password",
        name: "Jane",
        lastname: "Doe",
        age: 30,
        isAdmin: false,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Could not create an account");
  });
});

describe("User Controller - logout", () => {
  test("should logout user successfully", async () => {
    const response = await request(testServer).post("/api/user/logout");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Logout success" });
  });
});