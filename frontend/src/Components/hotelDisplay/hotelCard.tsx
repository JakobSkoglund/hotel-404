import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { IHotel } from "../../Model/Hotel";
import { createStyles } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
type HotelProps = IHotel

const HotelCard: React.FC<HotelProps> = ({image, title, description, price, city}) => {
  const navigate = useNavigate(); 
  return (
    <Card
      sx={{
        //height: { xs: "auto", sm: "52vh" },
        
        width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" }, 
        display: 'flex',
        flexDirection: 'column'
      }}
      
    >
      
      <CardActionArea onClick={() => navigate("/hotelDetail")}>
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
          <Typography gutterBottom variant="h6" component="div" >
            {city}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
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
