import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Components/SignIn/login';
import reportWebVitals from './reportWebVitals';
import Signup from './Components/SignIn/signup';
import NavAppBar from './Components/homeScreen/navBar';
import SearchBar from './Components/homeScreen/searchBar';
import Bookings from './Components/userBookingPage/userBookings';
import HotelTemplate from './Components/HotelDisplay/hoteltemplate';
import DisplayHotel from './Components/HotelDisplay/displayHotelCard';
import HotelDate from './Components/hotelPage/hotelDate';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/*Ändra på elementet nedan för att rendera din komponent efter att ha importerat den  */}
    <HotelDate/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
