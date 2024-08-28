import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const EventSponsorImages = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const theme = useTheme();

    const images = [
        `${process.env.PUBLIC_URL}/images/events/event-sponsors/image1.png`,
        `${process.env.PUBLIC_URL}/images/events/event-sponsors/image2.png`,
        `${process.env.PUBLIC_URL}/images/events/event-sponsors/image3.png`,
        `${process.env.PUBLIC_URL}/images/events/event-sponsors/image4.png`,
        `${process.env.PUBLIC_URL}/images/events/event-sponsors/image5.png`,
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 4000); // Auto-slide every 4 seconds

        return () => clearInterval(interval);
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                maxWidth: '1200px',
                margin: 'auto',
                padding: theme.spacing(4),
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
               
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
                    position: 'relative',
                    width: '100%',
                    height: { xs: '200px', sm: '400px', md: '500px' },
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        transform: `translateX(-${currentIndex * 100}%)`,
                        transition: 'transform 0.8s ease-in-out',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {images.map((src, index) => (
                        <Box
                            key={index}
                            component="img"
                            src={src}
                            alt={`Event Sponsor ${index}`}
                            sx={{
                                minWidth: '100%',
                                height: '100%',
                                objectFit: 'contain',
          
          
                             
                             
                             
                             
                            }}
                        />
                    ))}
                </Box>

               
               
               
               
               
               
               
               
               
               
               
               
               
               
               
               
               

               
               
               
               
               
               
               
               
               
               
               
         
               
               
               
               
               
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: theme.spacing(2),
                }}
            >
                {images.map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            backgroundColor: index === currentIndex ? '#ff6341' : theme.palette.grey[500],
                            margin: theme.spacing(0.5),
                            transition: 'background-color 0.3s ease',
                            cursor: 'pointer',
                        }}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default EventSponsorImages;
