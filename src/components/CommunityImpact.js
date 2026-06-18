import React from 'react';
import { Container, Grid, Box, Typography, Card, CardContent } from '@mui/material';
import { Groups, CalendarMonth, Handshake, Favorite } from '@mui/icons-material';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const stats = [
  {
    icon: <Groups sx={{ color: '#e64a19', fontSize: 48 }} />,
    value: 800,
    suffix: '+',
    label: 'Community Members',
    description: 'A growing family of Malayalees in Fredericton & surroundings.'
  },
  {
    icon: <CalendarMonth sx={{ color: '#e64a19', fontSize: 48 }} />,
    value: 15,
    suffix: '+',
    label: 'Annual Events',
    description: 'Celebrating Onam, Vishu, Christmas, sports, and picnics.'
  },
  {
    icon: <Handshake sx={{ color: '#e64a19', fontSize: 48 }} />,
    value: 5,
    suffix: '+',
    label: 'Settlement Programs',
    description: 'Providing airport pickup, housing search, and job assistance.'
  },
  {
    icon: <Favorite sx={{ color: '#e64a19', fontSize: 48 }} />,
    value: 100,
    suffix: '%',
    label: 'Volunteer Driven',
    description: 'Run entirely by passionate members dedicated to helping others.'
  }
];

const CommunityImpact = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <Box 
      ref={ref} 
      sx={{ 
        py: { xs: 8, md: 12 }, 
        position: 'relative',
        background: 'transparent'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
              letterSpacing: '-0.02em',
              mb: 2
            }}
          >
            Our Community at a <Box component="span" sx={{ color: '#e64a19' }}>Glance</Box>
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto', fontWeight: 500, fontSize: { xs: '1rem', md: '1.2rem' } }}
          >
            Empowering, supporting, and celebrating the vibrant culture of Kerala in New Brunswick.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    borderRadius: 4,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 15px 35px rgba(230, 74, 25, 0.08)',
                      borderColor: 'rgba(230, 74, 25, 0.2)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        color: 'text.primary',
                        mb: 1,
                        fontFamily: "'Outfit', sans-serif"
                      }}
                    >
                      {inView ? (
                        <CountUp start={0} end={stat.value} duration={2} />
                      ) : (
                        '0'
                      )}
                      {stat.suffix}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: '#e64a19',
                        mb: 1.5
                      }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {stat.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CommunityImpact;
