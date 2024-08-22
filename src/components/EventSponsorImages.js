import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const EventSponsorImages = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const theme = useTheme();

    // Manually list the images with PUBLIC_URL
    const images = [
        `${process.env.PUBLIC_URL}/images/events/event-sponsors/image1.png`,
        `${process.env.PUBLIC_URL}/images/events/event-sponsors/image2.png`,
        `${process.env.PUBLIC_URL}/images/events/event-sponsors/image3.png`,
        `${process.env.PUBLIC_URL}/images/events/event-sponsors/image4.png`,
        `${process.env.PUBLIC_URL}/images/events/event-sponsors/image5.png`
        // Add all image paths here
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [images.length]);

    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.background.default,
                padding: theme.spacing(2),
            }}
        >
            <Typography 
                variant="h4" 
                component="h1" 
                sx={{
                    marginBottom: theme.spacing(4),
                    textAlign: 'center',
                    color: theme.palette.text.primary,
                    fontWeight: 'bold',
                }}
            >
                Our Event <span style={{ color: '#ff6341' }}>Sponsors</span>
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    borderRadius: theme.shape.borderRadius,
                    boxShadow: `0px 4px 20px ${theme.palette.grey[500]}`,
                }}
            >
                <img
                    src={images[currentIndex]}
                    alt={`Event Sponsor ${currentIndex}`}
                    style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        transition: 'opacity 0.5s ease-in-out',
                        opacity: 0.9,
                    }}
                />
            </Box>
        </Box>
    );
};

export default EventSponsorImages;
