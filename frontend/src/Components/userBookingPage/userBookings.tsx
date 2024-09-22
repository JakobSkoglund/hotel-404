import React from 'react';
import { GetBookings } from "../../Controller/BookingController"; 

import Grid from '@mui/material/Grid2'; 
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table'; 
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';

const Bookings: React.FC = () => {

  return (
    <Grid container
    spacing={0}>
      <Grid size={12}
      display="flex"
      alignItems="center"
      justifyContent="center">
      <h1>Your Bookings</h1></Grid>
      <Grid size={12}
      marginLeft={"100px"}
      marginRight={"100px"}>
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="hotel bookings">
            <TableHead>
              <TableRow>
                <TableCell align="center">Hotel</TableCell>
                <TableCell align="center">From</TableCell>
                <TableCell align="center">To</TableCell>
                <TableCell align="center">Price</TableCell>
             </TableRow>
            </TableHead>
            <TableBody>
            {GetBookings().map((booking) => (
              <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{booking.hotel}</TableCell>
              <TableCell align="center">{booking.from_date}</TableCell>
              <TableCell align="center">{booking.to_date}</TableCell>
              <TableCell align="center">{booking.cost.toString()}</TableCell>
            </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Bookings;

