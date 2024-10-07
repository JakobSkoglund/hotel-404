import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import HotelCard from "./hotelCard"; 
import { getHotelInfo } from "../../Controller/HotelController";
import { IHotel } from "../../Model/Hotel";
import { useNavigate } from "react-router-dom"; 


interface DisplayHotelProps {
  hotels?: IHotel[];  // Optional hotels prop, used when passed from search results
}

const DisplayHotel: React.FC<DisplayHotelProps> = ({ hotels: propHotels }) => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<IHotel[]>([]);

  const getHotels = async function() {
    const fetchedHotels = await getHotelInfo();
    setHotels(fetchedHotels);
  }

  React.useEffect(() => {
    if (!propHotels) {  // Only fetch hotels if none are passed as props
      getHotels();
    } else {
      setHotels(propHotels);  // Use hotels from props (e.g., search results)
    }
  }, [propHotels]);

  return (
    <Grid container spacing={3} style={{ marginTop: 2 }}> 
      {hotels.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={item.id}>
          <HotelCard 
            id={item.id} 
            image={item.image} 
            title={item.title} 
            description={item.description} 
            price={item.price} 
            city={item.city}
            key={item.key}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DisplayHotel;
