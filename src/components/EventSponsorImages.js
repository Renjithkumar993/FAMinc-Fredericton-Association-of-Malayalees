import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const EventSponsorImages = () => {
    const [sponsorImages, setSponsorImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const theme = useTheme();

    useEffect(() => {
        // Fetch images from a JSON file
        const fetchSponsorImages = async () => {
            try {
                const response = await fetch(`${process.env.PUBLIC_URL}/images/events/event-sponsors.json`); // Adjust path as needed
                if (!response.ok) throw new Error('Failed to fetch sponsor images');
                const data = await response.json();
                setSponsorImages(data.images || []); // Assuming JSON contains an `images` array
            } catch (error) {
                console.error(error);
            }
        };

        fetchSponsorImages();
    }, []);

    useEffect(() => {
        if (sponsorImages.length > 0) {
            const interval = setInterval(() => {
                handleNext();
            }, 4000); // Auto-slide every 4 seconds

            return () => clearInterval(interval);
        }
    }, [sponsorImages]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? sponsorImages.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === sponsorImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    if (sponsorImages.length === 0) {
        // Render empty or placeholder content if no images
        return (
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '1200px',
                    margin: 'auto',
                    padding: theme.spacing(4),
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        color: theme.palette.text.secondary,
                        fontStyle: 'italic',
                    }}
                >
                    sponsors Details will be available here
                </Typography>
            </Box>
        );
    }

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
                    {sponsorImages.map((src, index) => (
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
                <IconButton
                    onClick={handlePrev}
                    sx={{
                        position: 'absolute',
                        left: theme.spacing(2),
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 1,
                        color: theme.palette.text.primary,
                    }}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton
                    onClick={handleNext}
                    sx={{
                        position: 'absolute',
                        right: theme.spacing(2),
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 1,
                        color: theme.palette.text.primary,
                    }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: theme.spacing(2),
                }}
            >
                {sponsorImages.map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            backgroundColor:
                                index === currentIndex ? '#ff6341' : theme.palette.grey[500],
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
