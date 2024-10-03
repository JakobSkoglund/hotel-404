import React from 'react';
import {useState, useEffect} from 'react'; 
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Components/SignIn/login';
import reportWebVitals from './reportWebVitals';
import Signup from './Components/SignIn/signup';
import NavAppBar from './Components/homeScreen/navBar';
import SearchBar from './Components/homeScreen/searchBar';
//import HotelTemplate from './Components/hotelDisplay/hoteltemplate';
import HotelTemplate from './Components/hotelPage/hoteltemplate';
import HotelDate from './Components/hotelPage/hotelDate';
import { pics } from './MocData/hotelPics';
import HotelDescription from './Components/hotelPage/hotelDescription';
import HotelPage from './Components/hotelPage/hotelPage';

import DisplayHotel from './Components/hotelDisplay/displayHotelCard';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Bookings from './Components/userBookingPage/userBookings'; 
import axios from 'axios';
import {useNavigate} from 'react-router-dom'; 

//Används för att hålla koll på globalt tillstånd i individuella komponenter
export const LoggedinContext = React.createContext<any>(false);
export const UsernameContext = React.createContext<any>("");

var initLoggedin = sessionStorage.getItem("loggedin") === "true"; 

const booking = () => {
  return (
    <div>
    <NavAppBar/>
    <Bookings/>
    </div>
  )
}

const Application: React.FC = () => {
  const [loggedin, setLoggedin] = useState(initLoggedin);
  const [globalUsername, setGlobalUsername] = useState("");

  // useEffect(() => {
  //   var sessionLoggedin = window.sessionStorage.getItem("loggedin");
  //   setLoggedin(sessionLoggedin === "true"); 
  // }, []);
  //
  // useEffect(() => {
  //   window.sessionStorage.setItem("loggedin", loggedin.toString()); 
  // }, [loggedin])
  axios.defaults.withCredentials = true;  
  useEffect(() => {
    console.log("page has been refreshed"); 
    const checkSession = async() => {
      console.log("checking session..."); 
      try{
        const session = await axios.get("http://localhost:7700/api/user/session");    console.log(session); 
        setLoggedin(true); 
      }
      catch {
        setLoggedin(false); 
      }
    }
    checkSession(); 
  }, []); 
  if(!loggedin) {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <LoggedinContext.Provider value={{loggedin: loggedin, setLoggedin: setLoggedin}}>
                <UsernameContext.Provider value={{globalUsername, setGlobalUsername}}>
                  <Login/>
                </UsernameContext.Provider>
              </LoggedinContext.Provider>}/>
            <Route path="/signup" element={
              <LoggedinContext.Provider value={{loggedin: loggedin, setLoggedin: setLoggedin}}>
                <UsernameContext.Provider value={{globalUsername, setGlobalUsername}}>
                <Signup/>
                </UsernameContext.Provider>
              </LoggedinContext.Provider>}/>
            <Route path="*" element={              
              <LoggedinContext.Provider value={{loggedin: loggedin, setLoggedin: setLoggedin}}>
                <UsernameContext.Provider value={{globalUsername, setGlobalUsername}}>
                  <Login/>
                </UsernameContext.Provider>
              </LoggedinContext.Provider>}/>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
  else {
    return (
      <div>
      <LoggedinContext.Provider value={{loggedin: loggedin, setLoggedin: setLoggedin}}>
      <UsernameContext.Provider value={{globalUsername, setGlobalUsername}}>
        <BrowserRouter>
        <NavAppBar/>
        <Routes>
            <Route path="/" element={
              <div>
                <SearchBar/>
                <DisplayHotel/>
              </div>}/>
            <Route path="/mybookings" element={<Bookings/>}/>
           <Route path="navapp" element={<NavAppBar/>}/>
           <Route path="/hotelDetail" element={<HotelPage/>}/>
          </Routes>
        </BrowserRouter>
        </UsernameContext.Provider>
        </LoggedinContext.Provider>
      </div>
    )
  }
}; 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/*Ändra på elementet nedan för att rendera din komponent efter att ha importerat den  */}
    {<Application/>}
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 
