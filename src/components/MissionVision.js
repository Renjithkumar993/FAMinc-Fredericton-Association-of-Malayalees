import React, { useEffect, useState } from 'react';
import { Grid, Box, Button, Container, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import './MissionVision.css';

const MissionVision = () => {
  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const { ref: imageRef, inView: imageInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const navigate = useNavigate();
  const [missionVisionData, setMissionVisionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMissionVisionData = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/config/missionvission.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setMissionVisionData(data.missionVision);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchMissionVisionData();
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

  const missionImage = `${process.env.PUBLIC_URL}/images/heroimages/MissionVission-Hero.png`;

  return (
    <Box 
      component="section" 
      id="mission" 
      sx={{ 
        py: { xs: 6, md: 10 },
        background: 'transparent',
        overflow: 'hidden'
      }}
    >
      <Container>
        <Grid container alignItems="center" spacing={6}>
          {/* Left Column: Text Content */}
          <Grid item xs={12} md={6} ref={textRef}>
            <Box
              component={motion.div}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: textInView ? 0 : 50, opacity: textInView ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              sx={{ textAlign: 'left' }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 1.5,
                  fontSize: { xs: '1.8rem', md: '2.4rem' },
                  letterSpacing: '-0.01em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                OUR <Box component="span" sx={{ color: 'primary.main' }}>
                  <Typewriter
                    words={['MISSION']}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={50}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </Box>
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ 
                  lineHeight: 1.7, 
                  mb: 4,
                  fontSize: '1.05rem' 
                }}
              >
                {missionVisionData.mission}
              </Typography>

              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 1.5,
                  fontSize: { xs: '1.8rem', md: '2.4rem' },
                  letterSpacing: '-0.01em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                OUR <Box component="span" sx={{ color: 'primary.main' }}>
                  <Typewriter
                    words={['VISION']}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={60}
                    deleteSpeed={50}
                    delaySpeed={2500}
                  />
                </Box>
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ 
                  lineHeight: 1.7, 
                  mb: 4,
                  fontSize: '1.05rem' 
                }}
              >
                {missionVisionData.vision}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/aboutus')}
                sx={{
                  px: 4.5,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 14px rgba(230, 74, 25, 0.25)',
                }}
              >
                Read More
              </Button>
            </Box>
          </Grid>

          {/* Right Column: Kathakali Dancer Illustration */}
          <Grid item xs={12} md={6} ref={imageRef}>
            <Box
              component={motion.div}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: imageInView ? 0 : -50, opacity: imageInView ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Box
                component="img"
                src={missionImage}
                alt="Mission and Vision Kathakali"
                sx={{
                  width: '100%',
                  maxWidth: '500px',
                  height: 'auto',
                  display: 'block',
                  // Blend the white background of the image with the textured page background
                  mixBlendMode: 'multiply',
                  filter: 'contrast(1.02)'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MissionVision;
