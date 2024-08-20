import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { Slide, Zoom } from 'react-awesome-reveal';
import PhoneIcon from '@mui/icons-material/Phone';

const AdComponent2 = () => {
  const [adData, setAdData] = useState(null);
  const adDataUrl = `${process.env.PUBLIC_URL}/config/adData-fg.json`;

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

  if (!adData) return <Typography>Loading ad...</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: 6,
          maxWidth: { xs: '100%', md: '800px' },
          mx: 'auto',
          backgroundColor: '#0c1a2c',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '-20%',
            left: '-20%',
            width: '150%',
            height: '150%',
            backgroundColor: 'rgba(255, 99, 65, 0.1)',
            borderRadius: '50%',
            zIndex: 0,
          }}
        />
        <CardContent sx={{ py: 4, position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: { xs: 'flex', md: 'block' },
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  mb: 2,
                  color: '#ff6341',
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                Our Sponsor
              </Typography>
              <Slide direction="right" triggerOnce={false}>
                <Zoom triggerOnce={false}>
                  <Box
                    component="img"
                    src={adData.logo}
                    alt="Sponsor Logo"
                    sx={{
                      maxWidth: '100%',
                      height: 'auto',
                      display: 'block',
                      mx: 'auto',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': { transform: 'scale(1.1)' },
                    }}
                  />
                </Zoom>
              </Slide>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    color: '#ffffff',
                    textAlign: { xs: 'center', md: 'left' },
                  }}
                >
                  We specialize in providing top-tier property restoration services and real estate solutions.
                </Typography>
                <Box
                  sx={{
                    textAlign: { xs: 'center', md: 'left' },
                    mb: 3,
                  }}
                >
                  {adData.services.map((service, index) => (
                    <Typography key={index} variant="body1" sx={{ mb: 1, color: '#ffffff' }}>
                      • {service}
                    </Typography>
                  ))}
                </Box>
                <Box
                  sx={{
                    mt: 3,
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    justifyContent: { xs: 'center', md: 'flex-start' },
                  }}
                >
                  <Button
                    variant="contained"
                    href={adData.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      px: 2.5,
                      py: 1,
                      fontSize: '0.875rem',
                      borderRadius: 20,
                      backgroundColor: '#ff6341',
                      '&:hover': { backgroundColor: '#ff4500' },
                      minWidth: { xs: '120px', md: 'auto' },
                    }}
                  >
                    Learn More
                  </Button>
                  <Button
                    variant="outlined"
                    href={`tel:${adData.phone}`}
                    sx={{
                      px: 2.5,
                      py: 1,
                      fontSize: '0.875rem',
                      borderRadius: 20,
                      color: '#ff6341',
                      borderColor: '#ff6341',
                      '&:hover': { backgroundColor: '#ffe6e0' },
                      minWidth: { xs: '120px', md: 'auto' },
                    }}
                  >
                    <PhoneIcon />
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdComponent2;
