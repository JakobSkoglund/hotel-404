import request from "supertest"; // To make HTTP requests
import app from "../src/index"; // Import booking server


// https://www.youtube.com/watch?v=FKnzS_icp20

// Mock the verify step in JWT
jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  verify: jest.fn(() => ({ username: 'test-user' })), // Mock valid token
}));

describe("Booking Service Server", () => {
  it("should respond with a 200 status code on the root route", async () => {
    const response = await request(app).post("/api/booking/test"); // Sending a GET request to the root
    expect(response.status).toBe(200); // Expecting a 200 OK status
  });

  it("should respond with a 200 status code on the root route", async () => {
    const response = await request(app).post("/api/booking/test"); // Sending a GET request to the root
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json")); // Expecting a 200 OK status
  });
  
});


describe('Booking API Tests', () => {
  it('should allow access to authenticated user', async () => {
    const res = await request(app)
      .post('/api/booking') 
      .set('Cookie', 'token=fake-jwt-token'); // Simulate token in cookies

    expect(res.status).not.toBe(401); 
    expect(res.status).not.toBe(403);
  });
});