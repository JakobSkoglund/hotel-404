import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Grid, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Html } from '@mui/icons-material';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoggedinContext } from '../../index';

const NavAppBar = () => {
    
    const navigate = useNavigate(); 
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
    


    const {loggedin, setLoggedin} = useContext(LoggedinContext); 
    {/*const navigate = useNavigate();*/}

    const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleLanguageClose = () => {
        setAnchorEl(null);
    }

    const handleLanguageSelect = (language: string) => {
        setSelectedLanguage(language);
        setAnchorEl(null);
    }
 
    const handleAboutClick = () => {
        {/*navigate('./aboutPage');*/}
    }

    const handleMyPageClick = (event: React.MouseEvent<HTMLElement>) => {
        setUserAnchorEl(event.currentTarget);
    }

    const handleMyPageClose = () => {
        setUserAnchorEl(null);
    }

    const handleMyPageBookingClick = () => {
        setUserAnchorEl(null);
        navigate('/myBookings');
    }

    const handleSignOutButtonClick = () => {
      setLoggedin(false); 
      navigate('/'); 
    }

    const handleBackToIndexClick = () => {
        navigate('/');
    }
 
    return (
        <AppBar position='static'>
            <Toolbar>
                {/* Left side, logo and name*/}
                <Box display={"flex"} alignItems={"center"} flexGrow={1}>
                    <ApartmentIcon style={{height: '40px', marginRight: '10px' }} sx={{fontSize: 30}}/>
                    <Typography variant='h6' component={"div"} fontSize={30} fontWeight={"bold"} onClick={handleBackToIndexClick} style={{cursor:'pointer'}}>
                        HOTEL-404
                    </Typography>
                </Box>

                {/* Right side, language selection, about and myPage buttons*/}
                <Box display={"flex"} alignItems={"center"}>
                    {/*Language dropdown */}
                    <Box sx={{ml: 3}}>
                        <IconButton color='inherit' onClick={handleLanguageClick}>
                            <LanguageOutlinedIcon sx={{fontSize: 30}}/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleLanguageClose}
                            keepMounted
                        >
                            {/*Only english for now */}
                            <MenuItem onClick={() => handleLanguageSelect('English')}>English</MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{ml: 3}}>
                        <Button color='inherit' variant='outlined' onClick={handleAboutClick}>
                            About
                        </Button>
                    </Box>
                    <Box sx={{ml: 3}}>
                        <IconButton color='inherit' onClick={handleMyPageClick}>
                            <AccountCircleIcon sx={{fontSize: 30}}/>
                        </IconButton>
                        <Menu
                            anchorEl={userAnchorEl}
                            open={Boolean(userAnchorEl)}
                            onClose={handleMyPageClose}
                            keepMounted
                        >
                            <MenuItem onClick={handleMyPageBookingClick}>My Bookings</MenuItem>
                            <MenuItem onClick={handleSignOutButtonClick}>Sign out</MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default NavAppBar;
