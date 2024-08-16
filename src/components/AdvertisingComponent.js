import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Button, Card, CardContent } from '@mui/material';
import { Slide, Zoom } from 'react-awesome-reveal';
import PhoneIcon from '@mui/icons-material/Phone';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const AdvertisingComponent = () => {
    const [adData, setAdData] = useState(null);
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.5,
    });
    const adDataUrl = `${process.env.PUBLIC_URL}/config/adData.json`;

    useEffect(() => {
        const fetchAdData = async () => {
            try {
                const response = await fetch(adDataUrl);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setAdData(data);
            } catch (error) {
                console.error('Error fetching ad data:', error);
            }
        };
        fetchAdData();
    }, [adDataUrl]);

    const handleButtonClick = async () => {
        try {
            const response = await fetch('https://famnb.ca/update_click_count.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            if (data.success) {
                console.log(`New count: ${data.newCount}`);
            } else {
                console.error('Error updating count:', data.message);
            }
        } catch (error) {
            console.error('Error handling button click:', error);
        }
    };

    if (!adData) return <Typography>Loading ad...</Typography>;

    return (
        <Container sx={{ py: 2 }}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, overflow: 'hidden', maxWidth: 1000, mx: 'auto', backgroundColor: '#f5f5f5' }}>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 'bold', letterSpacing: 1, textTransform: 'uppercase', mb: 1 }}>
                        Our Sponsor
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <Slide direction="left" triggerOnce={false}>
                                <Zoom triggerOnce={false}>
                                    <Box
                                        component="img"
                                        src={adData.smallImageUrl}
                                        alt="Small Sponsor Image"
                                        sx={{ height: 70, width: 'auto', display: 'block', mx: 'auto', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.1)' } }}
                                    />
                                </Zoom>
                            </Slide>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Zoom triggerOnce={false}>
                                <Box
                                    component="img"
                                    src={adData.imageUrl}
                                    alt={adData.altText}
                                    sx={{ width: '100%', display: 'block', mx: 'auto', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.1)' } }}
                                />
                            </Zoom>
                        </Grid>
                    </Grid>
                    <Typography variant="h9" color="textPrimary" sx={{  mt: 2, mb: 1 }}>
                        {adData.title}
                    </Typography>
                    <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }} ref={ref}>
                        {inView && (
                            <Typography variant="body2" color="textPrimary" sx={{ mb: 1 }}>
                                <CountUp start={0} end={800} duration={3} style={{ color: '#ff6341', fontWeight: 'bold', fontSize: '1rem' }} />
                                + Happy Clients
                            </Typography>
                        )}
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <Button
                                variant="contained"
                                href={adData.linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleButtonClick}
                                sx={{ px: 4, borderRadius: 20, backgroundColor: '#ff6341', '&:hover': { backgroundColor: '#ff4500' } }}
                            >
                                Learn More
                            </Button>
                            <Button
                                variant="outlined"
                                href={`tel:${adData.phoneNumber}`}
                                onClick={handleButtonClick}
                                sx={{ px: 2, borderRadius: 20, minWidth: '50px', color: '#ff6341', borderColor: '#ff6341', '&:hover': { backgroundColor: '#ffe6e0' } }}
                            >
                                <PhoneIcon />
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default AdvertisingComponent;
