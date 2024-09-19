import * as React from "react";
import Grid from "@mui/material/Grid";
import HotelDescription from "./hotelDescription";
import HotelTemplate from "./hoteltemplate";
import HotelDate from "./hotelDate";
import { pics } from "../../MocData/hotelPics";

const HotelPage = () => {
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
        <HotelDescription />
      </Grid>
      <Grid item xs={12}>
        <HotelDate />
      </Grid>
    </Grid>
  );
};

export default HotelPage;
