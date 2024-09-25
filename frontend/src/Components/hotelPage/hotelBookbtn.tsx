
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const CuteButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#007BFF', 
    color: '#FFFFFF', 
    padding: '10px 20px',
    borderRadius: '8px', 
    '&:hover': {
        backgroundColor: '#0056b3',
    },
    transition: 'background-color 0.3s ease',
}));

const MyButtonComponent = () => {
    const handleClick = () => {
        alert("Hotel Booked!");
    };

    return (
        <CuteButton variant="contained" onClick={handleClick}>
            Book now!
        </CuteButton>
    );
};

export default MyButtonComponent;