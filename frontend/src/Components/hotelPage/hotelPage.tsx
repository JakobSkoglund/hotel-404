import * as React from "react";
import Grid from "@mui/material/Grid";
import HotelDescription from "./hotelDescription";
import HotelTemplate from "./hoteltemplate";
import HotelDate from "./hotelDate";
import HotelBookbtn from "./hotelBookbtn";
import { pics } from "../../MocData/hotelPics";
import { getHotelPage } from "../../Controller/HotelController";
import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import { IHotelDetails } from "../../Model/Hotel";





const HotelPage = () => {
  const {hotelId }= useParams();
  console.log(hotelId); 
  const [hotel, setHotel] = useState<IHotelDetails>(); 
  const getHotelInfo = async function(){
    const hotel: IHotelDetails = await getHotelPage(hotelId? hotelId : "");
    console.log(hotel.page); 
    setHotel(hotel); 
  };
  useEffect(() => {
    getHotelInfo(); 
  }, [])

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: 2 }}
    >
      <Grid item xs={12}>
        <HotelTemplate hotels={pics} />
      </Grid>
      <Grid item xs={12}>
        <HotelDescription desc={hotel? hotel.page.description: ""} name={hotel? hotel.page.title: ""} />
      </Grid>
      <Grid item xs={12}>
        <HotelDate />
      </Grid>
      <Grid item xs={12}>
      <div style={{ marginTop: 25 }}> 
          <HotelBookbtn />
        </div>
      </Grid>

    </Grid>


  );
};

export default HotelPage;
