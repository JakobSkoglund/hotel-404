import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IHotel } from "../../Model/Hotel";
import axios from 'axios';
import DisplayHotel from "../hotelDisplay/displayHotelCard";

const SearchResults: React.FC = () => {
    const [hotels, setHotels] = useState<IHotel[]>([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const city = queryParams.get("city");
    const checkIn = queryParams.get("checkIn");
    const checkOut = queryParams.get("checkOut");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get("http://localhost:7700/api/hotels", {
                    params: { city, dateCheckIn: checkIn, dateCheckOut: checkOut },
                });
                setHotels(response.data);
            } catch (error) {
                console.error("Error fetching hotels:", error);
            }
        };

        fetchHotels();

    }, [city, checkIn, checkOut]);

    return (
      <div>
        <h2>Search Results</h2>
        <DisplayHotel hotels={hotels} />  {/* Pass the hotels as props */}
      </div>
    );
};

export default SearchResults;