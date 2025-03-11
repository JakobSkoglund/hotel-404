import { createBooking } from '../src/controllers/bookingController';
import { Booking } from "../src/models/Booking"; 
import axios from 'axios';
import { jest } from '@jest/globals'; // Ensure Jest is imported
import { Document } from 'mongoose';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../src/models/Booking', () => ({
  Booking: {
    create: jest.fn()
  }
}));

describe('createBooking function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a booking with mocked hotel data', async () => {
    const hotelID = 'mock-hotel-id';
    const user = 'mock-user';
    const from_date = '2025-04-01';
    const to_date = '2025-04-05';

    // Mock API response for hotel details
    mockedAxios.get.mockResolvedValue({
      data: {
        display: {
          title: 'Mock Hotel',
          price: 200,
        }
      }
    } as any); // Use `as any` to override strict typing issues

    // Mock Booking.create to simulate DB interaction
    const mockBooking = {
      _id: 'mock-id',
      hotel: hotelID,
      user: user,
      from_date: from_date,
      to_date: to_date,
      cost: 800
    };
    (Booking as any).create.mockResolvedValue(mockBooking);

    await createBooking(hotelID, user, from_date, to_date);

    expect(mockedAxios.get).toHaveBeenCalledWith(`http://api-gateway:7700/api/hotels/hotelDetails`, {
      params: { hotelId: hotelID }
    });

    expect((Booking as any).create).toHaveBeenCalledWith({
      hotel: hotelID,
      user: user,
      from_date: '2025-04-01',
      to_date: '2025-04-05',
      cost: 800 // 4 days * 200 price
    });
  });
});
