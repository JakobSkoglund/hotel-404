import request from "supertest"; // Supertest allows us to test HTTP requests without running a real server
import { app } from "../src/index";
import { Request, Response, NextFunction } from 'express';

jest.mock("../src/controllers/hotelController", () => ({
    getHotels: jest.fn((req, res) => res.status(200).json([{ name: "Mocked Hotel" }])),
    getAllHotels: jest.fn((req, res) => res.status(200).json([{ name: "Mocked Hotel List" }])),
    getHotelByQuery: jest.fn((req, res) => res.status(200).json({ name: "Mocked Hotel Details" })),
    createHotel: jest.fn((req, res) => res.status(201).json({ message: "Mocked Hotel Created" })),
}));
  
jest.mock("../src/config/db", () => ({
    connectHotelDB: jest.fn(() => Promise.resolve()), // Mocka DB-anslutningen
  }));

  jest.mock("../src/middleware/authMiddleware", () => ({
    authenticateJWT: jest.fn((req: Request, res: Response, next: NextFunction) => next()), // ✅ Fixad
    authorizeRole: jest.fn(() => (req: Request, res: Response, next: NextFunction) => next()), // ✅ Fixad
  }));

describe("Hotel Service API Tests", () => {

    // Tests if the API returns a list of hotels and responds with HTTP status 200 (OK)
    it("should return 200 for GET /api/hotels/all", async () => {
        const res = await request(app).get("/api/hotels/all");
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
    });

    // Tests if the API returns HTTP status 404 (Not Found) for a non-existent route
    it("should return 404 for non-existent route", async () => {
        const res = await request(app).get("/api/non-existent");
        expect(res.status).toBe(404);
    });
});