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
//För att använda Styling
import "./hotelPage.css";

const HotelPage = () => {
  const { hotelId } = useParams();
  console.log(hotelId);
  const [hotel, setHotel] = useState<IHotelDetails>();
  const getHotelInfo = async function () {
    const hotel: IHotelDetails = await getHotelPage(hotelId ? hotelId : "");
    console.log(hotel);
    setHotel(hotel);
  };
  useEffect(() => {
    getHotelInfo();
  }, []);

  const hotelImages = [
    { original: hotel ? hotel.hotel_img.url : "" },
    { original: hotel ? hotel.bath_img.url : "" },
    { original: hotel ? hotel.food_img.url : "" },
    { original: hotel ? hotel.room_img.url : "" },
    { original: hotel ? hotel.other_img.url : "" },
  ];
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: 2 }}
    >
      <div className="gallery-container">
        <ImageGallery
          showFullscreenButton={false}
          showPlayButton={false}
          items={hotelImages}
          
        />
      </div>

      <Grid item xs={12}>
        <HotelDescription
          desc={hotel ? hotel.page.description : ""}
          name={hotel ? hotel.page.title : ""}
        />
      </Grid>
      <Grid item xs={12}>
        <div style={{ marginTop: 25 }}>
          <HotelBooking />
        </div>
      </Grid>
    </Grid>
  );
};

export default HotelPage;
