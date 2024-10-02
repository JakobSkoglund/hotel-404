import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ApartmentIcon from "@mui/icons-material/Apartment";
import { DialogTitle, Grid, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Html } from '@mui/icons-material';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoggedinContext , UsernameContext} from '../../index';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const NavAppBar = () => {
    
    const navigate = useNavigate(); 
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
    const [openAboutDialog, setOpenAboutDialog] = useState(false);


    const {loggedin, setLoggedin} = useContext(LoggedinContext);
    const {username, setUsername} = useContext(UsernameContext); 
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
        setOpenAboutDialog(true); // Open the dialog
    }

    const handleAboutDialogClose = () => {
        setOpenAboutDialog(false); // Close the dialog
    };

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

    const handleDeleteUserOnClick = () => {
        
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
                            <MenuItem onClick={handleDeleteUserOnClick}> Delete Account</MenuItem>
                            <MenuItem onClick={handleSignOutButtonClick}>Sign out</MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Toolbar>
            <Dialog open={openAboutDialog} onClose={handleAboutDialogClose}>
                <DialogTitle>
                    About HOTEL-404
                </DialogTitle>
                <DialogContent>
                <Typography variant="body1">
                Welcome to HOTEL-404, created in 2024 by 4 datascience students. Adjust your expectations accordingly. 
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                        Enjoy your stay!
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAboutDialogClose} color="primary">
                        Close
                    </Button>
                </DialogActions>

            </Dialog>
        </AppBar>
    )
}

export default NavAppBar;
