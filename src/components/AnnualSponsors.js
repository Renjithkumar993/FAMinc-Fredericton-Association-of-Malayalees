import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Button, Card, CardContent } from '@mui/material';
import { Slide, Zoom } from 'react-awesome-reveal';
import PhoneIcon from '@mui/icons-material/Phone';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const AnnualSponsors = () => {
    const [sponsorOneData, setSponsorOneData] = useState(null);
    const [sponsorTwoData, setSponsorTwoData] = useState(null);
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.5,
    });

    const sponsorOneUrl = `${process.env.PUBLIC_URL}/config/adData.json`; // Sun Life
    const sponsorTwoUrl = `${process.env.PUBLIC_URL}/config/adData-fg.json`; // First General

    useEffect(() => {
        const fetchSponsorData = async (url, setData) => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching sponsor data:', error);
            }
        };

        fetchSponsorData(sponsorOneUrl, setSponsorOneData);
        fetchSponsorData(sponsorTwoUrl, setSponsorTwoData);
    }, [sponsorOneUrl, sponsorTwoUrl]);

    if (!sponsorOneData || !sponsorTwoData) return <Typography>Loading sponsor data...</Typography>;

    return (
        <Container sx={{ py: 6 }}>
            <Typography
                variant="h4"
                align="center"
                sx={{
                    mb: 5,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    color: '#000',
                    fontSize: { xs: '1.5rem', md: '3rem' },
                }}
            >
                Our Annual <span style={{ color: '#ff6341' }}>Sponsors</span>
            </Typography>
            <Grid container spacing={4}>
                {/* Sun Life Sponsor */}
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            borderRadius: 2,
                            boxShadow: 6,
                            background: '#f5f5f5',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                        }}
                    >
                        <CardContent
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <Box sx={{ textAlign: 'center', mb: 3 }}>
                                <Zoom triggerOnce={false}>
                                    <Box
                                        component="img"
                                        src={sponsorOneData.imageUrl}
                                        alt={sponsorOneData.altText}
                                        sx={{
                                            width: '100%',
                                            maxHeight: 150,
                                            objectFit: 'contain',
                                            mb: 2,
                                        }}
                                    />
                                </Zoom>
                                <Zoom triggerOnce={false}>
                                    <Box
                                        component="img"
                                        src={sponsorOneData.smallImageUrl}
                                        alt="Additional Sun Life Image"
                                        sx={{
                                            width: '100%',
                                            maxHeight: 150,
                                            objectFit: 'contain',
                                            mb: 2,
                                        }}
                                    />
                                </Zoom>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mb: 1,
                                        color: '#000',
                                        fontSize: { xs: '1rem', md: '1.25rem' },
                                    }}
                                >
                                    {sponsorOneData.title}
                                </Typography>
                                {inView && (
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#ff6341' }}>
                                        <CountUp start={0} end={800} duration={3} style={{ fontSize: '1.5rem' }} />+ Happy Clients
                                    </Typography>
                                )}
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
                                <Button
                                    variant="contained"
                                    href={sponsorOneData.linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        px: 4,
                                        py: 1,
                                        fontSize: '0.875rem',
                                        borderRadius: 20,
                                        backgroundColor: '#ff6341',
                                        '&:hover': { backgroundColor: '#ff4500' },
                                    }}
                                >
                                    Learn More
                                </Button>
                                <Button
                                    variant="outlined"
                                    href={`tel:${sponsorOneData.phoneNumber}`}
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        fontSize: '0.875rem',
                                        borderRadius: 20,
                                        color: '#ff6341',
                                        borderColor: '#ff6341',
                                        '&:hover': { backgroundColor: '#ffe6e0' },
                                    }}
                                >
                                    <PhoneIcon />
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* First General Sponsor */}
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            borderRadius: 2,
                            boxShadow: 6,
                            backgroundColor: '#0c1a2c',
                            color: '#fff',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                        }}
                    >
                        <CardContent
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <Box sx={{ textAlign: 'center', mb: 3 }}>
                                <Zoom triggerOnce={false}>
                                    <Box
                                        component="img"
                                        src={sponsorTwoData.logo}
                                        alt="First General Logo"
                                        sx={{
                                            width: '100%',
                                            maxHeight: 150,
                                            objectFit: 'contain',
                                            mb: 2,
                                        }}
                                    />
                                </Zoom>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mb: 1,
                                        color: '#ff6341',
                                        fontSize: { xs: '1rem', md: '1.25rem' },
                                    }}
                                >
                                    {sponsorTwoData.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: '#ffffff',
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                    }}
                                >
                                    {sponsorTwoData.subtitle}
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    {sponsorTwoData.services.map((service, index) => (
                                        <Typography
                                            key={index}
                                            variant="body1"
                                            sx={{
                                                mb: 1,
                                                color: '#ffffff',
                                                fontSize: { xs: '0.875rem', md: '1rem' },
                                            }}
                                        >
                                            • {service}
                                        </Typography>
                                    ))}
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
                                <Button
                                    variant="contained"
                                    href={sponsorTwoData.linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        px: 4,
                                        py: 1,
                                        fontSize: '0.875rem',
                                        borderRadius: 20,
                                        backgroundColor: '#ff6341',
                                        '&:hover': { backgroundColor: '#ff4500' },
                                    }}
                                >
                                    Learn More
                                </Button>
                                <Button
                                    variant="outlined"
                                    href={`tel:${sponsorTwoData.phone}`}
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        fontSize: '0.875rem',
                                        borderRadius: 20,
                                        color: '#ff6341',
                                        borderColor: '#ff6341',
                                        '&:hover': { backgroundColor: '#ffe6e0' },
                                    }}
                                >
                                    <PhoneIcon />
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AnnualSponsors;
