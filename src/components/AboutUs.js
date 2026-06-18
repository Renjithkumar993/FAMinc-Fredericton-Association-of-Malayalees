import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typography, Box } from '@mui/material';
import { Slide, Zoom } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading'; 

const AboutUs = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/config/aboutus.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  const aboutImage = `${process.env.PUBLIC_URL}/images/heroimages/Aboutus-hero.png`;

  return (
    <Box 
      component="section" 
      id="about" 
      sx={{ 
        py: { xs: 6, md: 10 },
        background: 'transparent',
      }}
    >
      <Container>
        <Grid container alignItems="center" spacing={5}>
          {/* Left Column: Text info */}
          <Grid item xs={12} md={6}>
            <Slide direction="left" duration={700} triggerOnce={false}>
              <Box sx={{ textAlign: 'left' }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 800, 
                    fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
                    letterSpacing: '-0.02em',
                    mb: 1
                  }}
                >
                  <Box component="span" sx={{ color: 'primary.main' }}>Malayalee</Box> Community
                </Typography>
                
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 600, 
                    color: 'text.secondary', 
                    mb: 3,
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    lineHeight: 1.4
                  }}
                >
                  Celebrating Kerala Culture in Fredericton, New Brunswick, Canada
                </Typography>

                {data.about.description.map((paragraph, index) => (
                  <Typography 
                    key={index} 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary', 
                      lineHeight: 1.7, 
                      mb: 2.5,
                      fontSize: '1.05rem' 
                    }}
                  >
                    {paragraph}
                  </Typography>
                ))}

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate('/contactus')}
                  sx={{
                    px: 4,
                    py: 1.25,
                    fontWeight: 700,
                    mt: 2,
                    borderRadius: '30px',
                    borderWidth: '2px',
                    '&:hover': {
                      borderWidth: '2px',
                    }
                  }}
                >
                  Get in touch
                </Button>
              </Box>
            </Slide>
          </Grid>

          {/* Right Column: Hero Image */}
          <Grid item xs={12} md={6}>
            <Zoom duration={700} triggerOnce={false}>
              <Box 
                sx={{ 
                  borderRadius: 4, 
                  overflow: 'hidden', 
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  backgroundColor: '#ffffff',
                }}
              >
                <Box 
                  component="img" 
                  src={aboutImage} 
                  alt="Mission and Vision" 
                  sx={{ 
                    width: '100%', 
                    height: 'auto', 
                    display: 'block',
                    transition: 'transform 0.5s ease',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }} 
                />
              </Box>
            </Zoom>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;
