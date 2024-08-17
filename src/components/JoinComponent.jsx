import React from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus } from 'react-icons/fa';
import { Button, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
        background: 'linear-gradient(135deg, #FFD700 0%, #FF6347 100%)',
        color: '#fff',
        padding: { xs: '40px 30px', md: '60px 80px' },
        borderRadius: '30px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        maxWidth: '1200px',
        margin: 'auto',
        overflow: 'hidden',
        marginTop:"30px"
      }}
    >
      <Box sx={{ maxWidth: '800px', margin: 'auto', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#ffffff', mb: 3 }}>
          Join the Fredericton Association of Malayalees today!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: '#f0f0f0' }}>
          Become a member and be part of our vibrant community. Explore more resources in our{' '}
          <Typography
            component="span"
            onClick={() => navigate('/usefullinks')}
            sx={{
              fontWeight: 'bold',
              color: '#ffeb3b',
              textDecoration: 'underline',
              cursor: 'pointer',
              '&:hover': {
                color: '#ffca28',
              },
            }}
          >
            Useful Links
          </Typography>
          section.
          <br />
          <br />
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
            padding: { xs: '10px 20px', md: '12px 24px' },
            borderRadius: '40px',
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: { xs: '0.9rem', md: '1rem' },
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: '#d84315',
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
