import * as React from 'react';
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const HotelDescription = () => {

    return(
        <Grid container justifyContent="center">
        <Grid item xs={12} sm={8}>
        <Card variant='outlined' sx ={{maxWidth:980, padding: 2, border:'none', margin: "0 auto",}}>
            <Typography variant="h4" align='center'>Syntax Error Suites</Typography>
            <Typography>

                
            Welcome to Syntax Error Suites — where luxury meets imagination! Nestled in the heart of nowhere yet somehow everywhere, our five-star hotel offers the perfect blend of non-existent view
            ✨ Why choose us?
            Rooms fit for royalty: Handcrafted by invisible artisans, each suite features air that’s 100% fresher than anywhere else in the world. Enjoy custom-designed beds that may or may not exist!
Gourmet dining: Our award-winning chef serves up meals that taste like they were cooked by the gods themselves — or maybe it’s just your imagination. Either way, you'll love every bite!
                
            </Typography>
        </Card>
        </Grid>
        </Grid>
    );
};

export default HotelDescription;