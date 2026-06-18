import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const slides = [
  {
    image: `${process.env.PUBLIC_URL}/images/heroimages/Fredericton_Sunset_2021.avif`,
    welcome: 'Welcome to FAM',
    description: 'Fredericton Association of Malayalees (FAM) is a registered non-profit organization established under the Society Act in 2021.',
    primaryBtn: { text: 'About Us', action: '#about' },
    secondaryBtn: { text: 'Learn more', action: '/aboutus' }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/heroimages/Kerala-hero.avif`,
    welcome: 'Join us for our events',
    description: 'Explore our upcoming events and join us for a wonderful experience.',
    primaryBtn: { text: 'Events', action: '/events' },
    secondaryBtn: { text: 'More info', action: '/events' }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/heroimages/nb.jpg`,
    welcome: 'Be a part of our community',
    description: 'Join us and be a part of a vibrant and supportive community.',
    primaryBtn: { text: 'Join Now', action: '/joinus' },
    secondaryBtn: { text: 'Learn more', action: '/aboutus' }
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  const handlePrimaryButtonClick = (action) => {
    if (action.startsWith('#')) {
      const element = document.getElementById(action.substring(1)) || document.querySelector(action);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate(action);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '80vh',
        minHeight: '550px',
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
    >
      {/* Slides transition container */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <Box
          key={current}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {/* Background Image with Ken Burns zoom effect */}
          <Box
            component={motion.div}
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 6, ease: 'linear' }}
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${slides[current].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Dark Overlay for contrast */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.7) 100%)',
              zIndex: 1,
            }}
          />

          {/* Content Wrapper */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              color: 'white',
              zIndex: 2,
              px: { xs: 3, sm: 6, md: 12 },
            }}
          >
            {/* Slide Title */}
            <Typography
              component={motion.h1}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                fontWeight: 800,
                mb: 2,
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                color: '#ffffff',
              }}
            >
              {slides[current].welcome}
            </Typography>

            {/* Slide Description */}
            <Typography
              component={motion.p}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.4rem' },
                maxWidth: '750px',
                mb: 4,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 1.6,
              }}
            >
              {slides[current].description}
            </Typography>

            {/* Button Group */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              sx={{
                display: 'flex',
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
                width: { xs: '100%', sm: 'auto' },
                justifyContent: 'center',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePrimaryButtonClick(slides[current].primaryBtn.action)}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1rem',
                  fontWeight: 700,
                  boxShadow: '0 6px 20px rgba(230, 74, 25, 0.4)',
                  '&:hover': {
                    backgroundColor: '#d84315',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(230, 74, 25, 0.5)',
                  },
                }}
              >
                {slides[current].primaryBtn.text}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate(slides[current].secondaryBtn.action)}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  borderWidth: '2px',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '2px',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {slides[current].secondaryBtn.text}
              </Button>
            </Box>
          </Box>
        </Box>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: { xs: 8, sm: 24 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          color: 'rgba(255, 255, 255, 0.7)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(4px)',
          '&:hover': {
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          p: 1.5,
        }}
        aria-label="Previous slide"
      >
        <ArrowBackIosNewIcon fontSize="medium" />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: { xs: 8, sm: 24 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          color: 'rgba(255, 255, 255, 0.7)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(4px)',
          '&:hover': {
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          p: 1.5,
        }}
        aria-label="Next slide"
      >
        <ArrowForwardIosIcon fontSize="medium" />
      </IconButton>

      {/* Slide Indicators / Dots */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: 1.5,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            sx={{
              width: index === current ? 24 : 10,
              height: 10,
              borderRadius: '5px',
              backgroundColor: index === current ? '#e64a19' : 'rgba(255, 255, 255, 0.5)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: index === current ? '#e64a19' : 'rgba(255, 255, 255, 0.8)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LandingPage;
