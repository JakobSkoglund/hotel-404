import React from "react";
import hotel1 from "../../Images/hotel1.png";
import room1 from "../../Images/room1.png";
import hall1 from "../../Images/hall1.png";
import hall2 from "../../Images/hall2.png";
import bath1 from "../../Images/bath1.png";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from '@mui/material/Box';
import "./HotelTemplate.css";

const itemData = [
  {
    img: hotel1,
    title: "Hotel Lá Bomba",
    rows: 2,
    cols: 1,
  },
  {
    img: room1,
    title: "Hotel Lá Bomba",

  },
  {
    img: hall1,
    title: "Hotel Lá Bomba",

  },
  {
    img: bath1,
    title: "Hotel Lá Bomba",


  },
  {
    img: hall2,
    title: "Hotel Lá Bomba",

  },
];



function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

const HotelTemplate = () => {
  return (
    
    <Grid container spacing={1}>
      <Grid item xs={12} sm={8}>
        <ImageList
          className="custom-image-list"
          sx={{ width: 500, height: 450 }}
          variant="quilted"
          cols={2}
          rowHeight={150}
        >
          {itemData.map((item) => (
            <ImageListItem
              key={item.img}
              cols={item.cols || 1} 
              rows={item.rows || 1}
            >
              <img
                {...srcset(item.img, 150, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    </Grid>
  );
};
export default HotelTemplate;
