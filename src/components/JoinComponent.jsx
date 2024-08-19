import React from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus } from 'react-icons/fa';
import { Button, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const bgBack = `${process.env.PUBLIC_URL}/images/heroimages/a1.jpg`;

const JoinComponent = () => {
  const navigate = useNavigate();

  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      sx={{
        background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bgBack}) no-repeat center center fixed`,
        backgroundSize: 'cover',
        color: '#ffffff',
        padding: { xs: '30px 20px', sm: '40px 30px', md: '60px 80px' },
        borderRadius: '20px',
        textAlign: 'center',
        maxWidth: { xs: '90%', sm: '85%', md: '1200px' },
        margin: 'auto',
        overflow: 'hidden',
        marginTop: '30px',
      }}
    >
      <Box sx={{ maxWidth: '800px', margin: 'auto', mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: '#ffd54f',
            mb: 3,
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
            fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' },
          }}
        >
          Join the Fredericton Association of Malayalees today!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: '#f5f5f5',
            fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
            lineHeight: 1.6,
          }}
        >
          Become a member and be part of our vibrant community. Explore more resources in our{' '}
          <Typography
            component="span"
            onClick={() => navigate('/usefullinks')}
            sx={{
              fontWeight: 'bold',
              color: '#ffca28',
              textDecoration: 'underline',
              cursor: 'pointer',
              '&:hover': {
                color: '#ff9800',
              },
              display: 'inline-block',
              padding: '2px 6px',
              borderRadius: '4px',
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
            }}
          >
            Useful Links
          </Typography>
          section.
        </Typography>
      </Box>
      <Box
        component={motion.div}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Button
          variant="contained"
          onClick={() => navigate('/joinus')}
          startIcon={<FaUserPlus />}
          sx={{
            backgroundColor: '#e64a19',
            color: '#ffffff',
            padding: { xs: '10px 20px', sm: '12px 24px', md: '14px 28px' },
            borderRadius: '50px',
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: '#d84315',
              boxShadow: '0 12px 20px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          Join Community
        </Button>
      </Box>
    </Container>
  );
};

export default JoinComponent;
