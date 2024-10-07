import React, { useState , useContext} from "react";
import { Grid, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import axios from "axios";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { IHotel } from '../../Model/Hotel';
import { useParams } from "react-router-dom";
import { useProps } from "@mui/x-data-grid/internals";
import { LoggedinContext , UsernameContext} from "../../index";

interface IHotelDetails {
    id: string;
    title: string;
    description: string;
    city: string;
    price: number;
    hotel_img: string;
  }

const CuteButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#007BFF', 
    color: '#FFFFFF', 
    padding: '10px 20px',
    borderRadius: '8px', 
    '&:hover': {
        backgroundColor: '#0056b3',
    },
    transition: 'background-color 0.3s ease',
}));

const HotelBooking = () => {
    const [dateCheckIn, setDateCheckIn] = useState<Date | null>(null);
    const [dateCheckOut, setDateCheckOut] = useState<Date | null>(null);
    const {hotelId }= useParams();
    console.log(hotelId); 
    const {globalUsername, setGlobalUsername} = useContext(UsernameContext); 

    const handleBookHotel = async () => {
        if(!dateCheckIn || !dateCheckOut) {
            alert("Please select both check-in and check-out dates.");
            return;
        }

        const fromDate = dateCheckIn.toISOString();
        const toDate = dateCheckOut.toISOString();

        try 
        {
            await axios.post("http://localhost:7700/api/booking/", {
                hotelID: hotelId,  
                user: globalUsername,
                from_date: fromDate,
                to_date: toDate,
            });
            alert("Booking successful!");
            window.location.reload();
        }
        catch 
        {
            alert("Error booking hotel. Please try again.");
        }
    };
    return (
        <Grid>
          <Box
            sx={{
              border: "2px solid #1976d2",
              padding: "10px",
              borderRadius: "8px",
              maxWidth: "400px",
              margin: "auto",
              mt: 2,
            }}
          >
            <Grid container spacing={2} alignItems={"center"}>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Check-in"
                    value={dateCheckIn}
                    onChange={(value) => setDateCheckIn(value)}
                  />
                </LocalizationProvider>
              </Grid>
    
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Check-out"
                    value={dateCheckOut}
                    onChange={(value) => setDateCheckOut(value)}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>
          <CuteButton variant="contained" onClick={handleBookHotel}>
            Book now!
          </CuteButton>
        </Grid>
      );
    };


export default HotelBooking;
