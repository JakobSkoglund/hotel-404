import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import HotelCard from "./hotelCard"; 
import { getHotelInfo } from "../../Controller/HotelController";
import { IHotel } from "../../Model/Hotel";
import { useNavigate } from "react-router-dom"; 

const DisplayHotel: React.FC = () => {
  const navigate = useNavigate();
  const getHotels = async function(){
    const hotels = await getHotelInfo();
    setHotels(hotels);
    console.log(hotels); 
  }

  React.useEffect(()=> {
    getHotels(); 
  }); 
  const [hotels, setHotels] = useState<IHotel[]>([]); 
  return (
    <Grid container spacing={3} style={{marginTop:2}}> 
      {hotels.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={item.key}>
          <HotelCard id={item.id} image={item.image} title={item.title} description={item.description} price={item.price} city={item.city} key={""}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default DisplayHotel;
