import * as React from 'react';
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const HotelDescription = () => {

    return(
        <Card variant='outlined' sx ={{maxWidth:600, paddingRight: 1, paddingLeft:1, border:'none', marginTop:2}}>
            <Typography variant="h4">Syntax Error Suites</Typography>
            <Typography>
                Väasdasd asd asd asd asd a asd asd ad asd as ad ads asd asd as sd asd sd aaaa asd asd ads asd
                sasda dasd asd a ad ad asd a ad ad ad ad asd asd ads ad ada da da da  ad dasda jd jas d j.
            </Typography>
        </Card>
    )
}

export default HotelDescription;