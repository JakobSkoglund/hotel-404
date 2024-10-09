import * as React from "react";
import Grid from "@mui/material/Grid";
import HotelDescription from "./hotelDescription";
import HotelTemplate from "./hoteltemplate";
import HotelDate from "./hotelDate";
import HotelBooking from "./hotelBookbtn";
import { pics } from "../../MocData/hotelPics";
import { getHotelPage } from "../../Controller/HotelController";
import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import { IHotelDetails } from "../../Model/Hotel";
import ImageGallery from "react-image-gallery"; 
import "react-image-gallery/styles/css/image-gallery.css";



const HotelPage = () => {
  const {hotelId }= useParams();
  console.log(hotelId); 
  const [hotel, setHotel] = useState<IHotelDetails>(); 
  const [validHotel, setValidHotel] = useState<Boolean>(true); 

  //Call backend API to get info for hotel
  const getHotelInfo = async function(){

    //Handle the case where the hotel is not found on the server
    try{
      const hotel: IHotelDetails = await getHotelPage(hotelId? hotelId : "");
      console.log(hotel); 
      setHotel(hotel);
      setValidHotel(true); 
    }
    catch{
      setValidHotel(false); 
    }
    
  };
  useEffect(() => {
    getHotelInfo(); 
  }, []); 

  let hotelImages = [
    {original: hotel? hotel.hotel_img.url: "", 
    originalHeight: 1080*0.45, 
    originalWidth: 1920*0.45}, 
    {original: hotel? hotel.bath_img.url: "", 
    originalHeight: 1080*0.45, 
    originalWidth: 1920*0.45}, 
    {original: hotel? hotel.food_img.url: "", 
    originalHeight: 1080*0.45, 
    originalWidth: 1920*0.45}, 
    {original: hotel? hotel.room_img.url:"", 
    originalHeight: 1080*0.45, 
    originalWidth: 1920*0.45}, 
    {original: hotel? hotel.other_img.url:"", 
    originalHeight: 1080*0.45, 
    originalWidth: 1920*0.45},
    ]
    if(validHotel){
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: 2 }}
    >
        <ImageGallery items={hotelImages}/>
      <Grid item xs={12}>
        <HotelDescription desc={hotel? hotel.page.description: ""} name={hotel? hotel.page.title: ""} />
      </Grid>
      <Grid item xs={12}>
        <HotelDate />
      </Grid>
      <Grid item xs={12}>
      <div style={{ marginTop: 25 }}> 
          <HotelBooking/>
        </div>
      </Grid>

    </Grid>
      );
    }
    else {
      return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: 2 }}
      >
      <p>Couldn't find hotel</p>
      </Grid>
      )
    }
};

export default HotelPage;
