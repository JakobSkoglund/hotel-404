import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { IHotel } from "../../MocData/hotelCards";
import { createStyles } from "@mui/material";

type HotelProps = IHotel

const HotelCard: React.FC<HotelProps> = ({image, title, description, price}) => {
  return (
    <Card
      sx={{
        //height: { xs: "auto", sm: "52vh" },
        
        width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" }, 
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{
            //height: { xs: "25vh", sm: "35vh" },
            height:"100%",
            width: "100%",
            //objectFit: "cover"
          }}
          image={image}
          alt="Image of the Hotel"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
          <Typography
            sx={{
              textAlign: "right",
              marginTop: "2vh",
              fontWeight: "bolder",
            }}
          >
            {price}$/Night
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default HotelCard;
