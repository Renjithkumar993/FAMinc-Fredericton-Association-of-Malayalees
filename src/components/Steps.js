import React from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ShareIcon from '@mui/icons-material/Share';
import WhatWeDo from './WhatWeDo';

const Steps = () => {
  const activities = [
    {
      icon: <EventIcon fontSize="large" sx={{ color: '#e64a19' }} />,
      text: "Join us at various cultural events, gatherings, and celebrations organized by the association."
    },
    {
      icon: <VolunteerActivismIcon fontSize="large" sx={{ color: '#e64a19' }} />,
      text: "Get involved by volunteering for different roles and activities within the association."
    },
    {
      icon: <ShareIcon fontSize="large" sx={{ color: '#e64a19' }} />,
      text: "Stay updated with the latest news, announcements, and activities by following our social media channels."
    }
  ];

  return (
    <Box 
      component="section" 
      id="about" 
      sx={{ 
        py: { xs: 6, md: 10 },
        background: 'transparent',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left Column: Get Involved Info */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 2,
                  fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
                  letterSpacing: '-0.02em',
                }}
              >
                Get Involved <Box component="span" sx={{ color: '#e64a19' }}>With Us</Box>
              </Typography>
              
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'text.secondary', 
                  mb: 4,
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  lineHeight: 1.4
                }}
              >
                Join Our Vibrant Malayalee Community in Fredericton
              </Typography>

              {/* Activities list using Paper badges */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {activities.map((act, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2.5,
                      p: 2.5,
                      borderRadius: 4,
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      backgroundColor: 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(8px)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        transform: 'translateX(6px)',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.03)',
                        borderColor: 'rgba(230, 74, 25, 0.3)',
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        borderRadius: '50%', 
                        backgroundColor: 'rgba(230, 74, 25, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {act.icon}
                    </Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 500, 
                        color: 'text.primary',
                        fontSize: '1rem',
                        lineHeight: 1.5,
                        textAlign: 'left'
                      }}
                    >
                      {act.text}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right Column: WhatWeDo widgets */}
          <Grid item xs={12} md={6}>
            <WhatWeDo />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Steps;
