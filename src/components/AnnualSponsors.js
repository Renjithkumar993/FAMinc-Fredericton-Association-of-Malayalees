import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Button, Card, CardContent, Divider, Chip } from '@mui/material';
import { Zoom } from 'react-awesome-reveal';
import PhoneIcon from '@mui/icons-material/Phone';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const AnnualSponsors = () => {
    const [sponsorOneData, setSponsorOneData] = useState(null);
    const [sponsorTwoData, setSponsorTwoData] = useState(null);
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.3,
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

    if (!sponsorOneData || !sponsorTwoData) return <Typography align="center" sx={{ py: 4 }}>Loading sponsor data...</Typography>;

    return (
        <Container ref={ref} sx={{ py: { xs: 6, md: 10 } }}>
            <Typography
                variant="h3"
                align="center"
                sx={{
                  fontWeight: 800,
                  mb: 6,
                  fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
                  letterSpacing: '-0.02em',
                }}
            >
                Our Annual <Box component="span" sx={{ color: '#e64a19' }}>Sponsors</Box>
            </Typography>
            <Grid container spacing={4} alignItems="stretch">
                {/* Sun Life Sponsor */}
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            backgroundColor: '#ffffff',
                            borderRadius: 4,
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            overflow: 'hidden',
                        }}
                    >
                        <CardContent
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                p: { xs: 3, md: 4 },
                            }}
                        >
                            {/* Logo Row */}
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 90, mb: 3 }}>
                                <Zoom triggerOnce={false}>
                                    <Box
                                        component="img"
                                        src={sponsorOneData.imageUrl}
                                        alt={sponsorOneData.altText}
                                        sx={{
                                            maxHeight: 70,
                                            maxWidth: '260px',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </Zoom>
                            </Box>
                            
                            <Divider sx={{ mb: 3 }} />

                            {/* Portraits Area */}
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                                <Zoom triggerOnce={false}>
                                    <Box
                                        component="img"
                                        src={sponsorOneData.smallImageUrl}
                                        alt="Sun Life Advisor"
                                        sx={{
                                            height: 110,
                                            width: 180,
                                            borderRadius: 3,
                                            objectFit: 'cover',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                                            border: '1px solid rgba(0, 0, 0, 0.08)',
                                        }}
                                    />
                                </Zoom>
                            </Box>

                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    mb: 1.5,
                                    fontSize: '1.2rem',
                                    color: '#e64a19',
                                    textAlign: 'center'
                                }}
                            >
                                Stride Financial Solutions
                            </Typography>

                            <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ 
                                    lineHeight: 1.6, 
                                    mb: 3, 
                                    flexGrow: 1,
                                    textAlign: 'center',
                                    fontSize: '0.925rem'
                                }}
                            >
                                {sponsorOneData.title}
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                                {inView ? (
                                    <Chip 
                                        label={
                                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#e64a19' }}>
                                                <CountUp start={0} end={800} duration={2.5} />+ Happy Clients
                                            </Typography>
                                        }
                                        sx={{ 
                                            backgroundColor: 'rgba(230, 74, 25, 0.08)', 
                                            px: 1, 
                                            py: 2, 
                                            borderRadius: '12px' 
                                        }}
                                    />
                                ) : (
                                    <Box sx={{ height: 32 }} />
                                )}
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 'auto' }}>
                                <Button
                                    variant="contained"
                                    href={sponsorOneData.linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        px: 4,
                                        py: 1.25,
                                        fontWeight: 700,
                                    }}
                                >
                                    Learn More
                                </Button>
                                <Button
                                    variant="outlined"
                                    href={`tel:${sponsorOneData.phoneNumber}`}
                                    sx={{
                                        px: 2,
                                        py: 1.25,
                                        color: '#e64a19',
                                        borderColor: '#e64a19',
                                        '&:hover': {
                                            borderColor: '#e64a19',
                                            backgroundColor: 'rgba(230, 74, 25, 0.04)',
                                        }
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
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            backgroundColor: '#ffffff',
                            borderRadius: 4,
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            overflow: 'hidden',
                        }}
                    >
                        <CardContent
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                p: { xs: 3, md: 4 },
                            }}
                        >
                            {/* Logo Row */}
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 90, mb: 3 }}>
                                <Zoom triggerOnce={false}>
                                    <Box
                                        component="img"
                                        src={sponsorTwoData.logo}
                                        alt="First General Logo"
                                        sx={{
                                            maxHeight: 70,
                                            maxWidth: '260px',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </Zoom>
                            </Box>
                            
                            <Divider sx={{ mb: 3 }} />

                            {/* Title / Subtitle Info */}
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    mb: 1.5,
                                    fontSize: '1.2rem',
                                    color: '#e64a19',
                                    textAlign: 'center',
                                    mt: 1,
                                }}
                            >
                                {sponsorTwoData.title}
                            </Typography>

                            <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ 
                                    lineHeight: 1.6, 
                                    mb: 3, 
                                    fontSize: '0.925rem',
                                    textAlign: 'center',
                                }}
                            >
                                {sponsorTwoData.subtitle}
                            </Typography>

                            {/* Services List Display */}
                            <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, flexGrow: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
                                    Key Offerings:
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                                    {sponsorTwoData.services.map((service, index) => (
                                        <Chip 
                                            key={index} 
                                            label={service} 
                                            variant="outlined"
                                            size="small"
                                            sx={{ 
                                                fontWeight: 600,
                                                borderColor: 'rgba(0,0,0,0.15)',
                                                borderRadius: '8px',
                                                py: 1.5
                                            }} 
                                        />
                                    ))}
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 'auto' }}>
                                <Button
                                    variant="contained"
                                    href={sponsorTwoData.linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        px: 4,
                                        py: 1.25,
                                        fontWeight: 700,
                                    }}
                                >
                                    Learn More
                                </Button>
                                <Button
                                    variant="outlined"
                                    href={`tel:${sponsorTwoData.phone}`}
                                    sx={{
                                        px: 2,
                                        py: 1.25,
                                        color: '#e64a19',
                                        borderColor: '#e64a19',
                                        '&:hover': {
                                            borderColor: '#e64a19',
                                            backgroundColor: 'rgba(230, 74, 25, 0.04)',
                                        }
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
