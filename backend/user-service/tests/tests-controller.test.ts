import request from "supertest";
import { app } from "../src/index"; // Importing the app
import { User } from "../src/models/User";
import { generateAccessToken } from "../src/services/tokenService";
import axios from "axios";
import mongoose from 'mongoose';

// Mocking the necessary modules
jest.mock("../src/models/User");
jest.mock("../src/services/tokenService", () => ({
    generateAccessToken: jest.fn(() => "mocked_token")  // Mock the function to return a fixed token
}));
jest.mock("axios");

beforeAll(async () => {
  // Simulate creating the real user "George123" with the password "0000"
  await request(app)
    .post("/api/user/signup")
    .send({
      username: "George123",
      password: "0000",
      name: "George",
      lastname: "Smith",
      age: 30,
      isAdmin: false,
    });
});

describe("User Controller - login", () => {
  test("should login successfully with valid credentials", async () => {
    // Mocking User.findOne to return a user
    (User.findOne as jest.Mock).mockResolvedValue({ _id: "123", username: "George123" });

    const response = await request(app)
      .post("/api/user/login")
      .send({ username: "George123", password: "0000" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Login successful" });
  });

  test("should return 400 if user not found", async () => {
    // Mocking User.findOne to return null
    (User.findOne as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .post("/api/user/login")
      .send({ username: "invalidUser", password: "wrongPass" });

    expect(response.status).toBe(400);
  });
});

describe("User Controller - signup", () => {
  test("should create a new user successfully", async () => {
    // Mocking User.exists and User.create
    (User.exists as jest.Mock).mockResolvedValue(false); // Simulate unique username
    (User.create as jest.Mock).mockResolvedValue({ _id: "123" });

    const response = await request(app)
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
    // Mocking User.exists to return true (username taken)
    (User.exists as jest.Mock).mockResolvedValue(true);

    const response = await request(app)
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
    const response = await request(app).post("/api/user/logout");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Logout success" });
  });
});


afterAll(async () => {
    // Close the mongoose connection after tests
    await mongoose.connection.close();
  });
