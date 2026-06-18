import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Box, Typography, Button } from '@mui/material';
import HelmetWrapper from '../HelmetWrapper';

const logo = `${process.env.PUBLIC_URL}/images/logofam.avif`;

const NotFoundPage = () => {
  return (
    <>
      <HelmetWrapper 
        pageTitle="404 - Page Not Found" 
        description="Oops! The page you are looking for does not exist. Return to the home page of Fredericton Association of Malayalees (FAM)."
      />
      <Container 
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '85vh',
          textAlign: 'center',
          py: { xs: 10, md: 15 },
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ mb: 4 }}
        >
          <Box
            component="img"
            src={logo}
            alt="FAM Logo"
            sx={{
              width: 130,
              height: 130,
              borderRadius: '50%',
              border: '3px solid #e64a19',
              boxShadow: '0 8px 24px rgba(230, 74, 25, 0.15)',
            }}
          />
        </Box>

        <Typography
          variant="h2"
          component={motion.h1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          sx={{
            fontWeight: 900,
            mb: 2,
            color: 'text.primary',
            fontSize: { xs: '2.2rem', sm: '3rem', md: '3.6rem' },
            letterSpacing: '-0.02em',
          }}
        >
          404 - Page Not Found
        </Typography>

        <Typography
          variant="h6"
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          sx={{
            fontWeight: 500,
            mb: 5,
            color: 'text.secondary',
            maxWidth: 500,
            mx: 'auto',
            lineHeight: 1.6,
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          Oops! The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </Typography>

        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
            sx={{
              py: 1.75,
              px: 5,
              fontSize: '1rem',
              fontWeight: 700,
              boxShadow: '0 6px 20px rgba(230, 74, 25, 0.3)',
              '&:hover': {
                boxShadow: '0 8px 25px rgba(230, 74, 25, 0.4)',
              }
            }}
          >
            Go Back Home
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default NotFoundPage;
