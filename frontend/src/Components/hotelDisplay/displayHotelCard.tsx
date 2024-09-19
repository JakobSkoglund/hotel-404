import * as React from "react";
import Grid from "@mui/material/Grid";
import HotelCard from "./hotelCard"; 
import {IHotel, hotels} from "../../MocData/hotelCards";

const DisplayHotel: React.FC = () => {
  return (
    <Grid container spacing={3} style={{marginTop:2}}> 
      {hotels.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={item.key}>
          <HotelCard image={item.image} title={item.title} description={item.description} price={item.price} key={""}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default DisplayHotel;
