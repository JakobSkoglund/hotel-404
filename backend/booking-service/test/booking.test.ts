import request from "supertest"; // To make HTTP requests
import app from "../src/index"; // Import your Express app (the server)


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
