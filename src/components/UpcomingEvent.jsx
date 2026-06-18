import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, Alert, Box, Card, Chip } from '@mui/material';
import { CalendarToday, AccessTime, ChevronRight } from '@mui/icons-material';
import Countdown from 'react-countdown';
import moment from 'moment-timezone';
import { useNavigate, Link } from 'react-router-dom';
import Loading from './Loading';
import './UpcomingEvent.css';

const UpcomingEvent = () => {
  const [updatedEvents, setUpdatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/config/events.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const eventsData = await response.json();
        const upcomingEventsData = eventsData.filter(event => event.upcomingEvent);
        const updatedEventsData = upcomingEventsData.map((event) => ({
          ...event,
          eventId: event.title.replace(/\s+/g, '').toLowerCase(),
        }));
        setUpdatedEvents(updatedEventsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Alert severity="error">Error: {error}</Alert>
      </Container>
    );
  }

  const UpcomingBanner = `${process.env.PUBLIC_URL}/images/events/upcoming-banner.png`;

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <Alert severity="info" sx={{ borderRadius: 3, fontWeight: 700 }}>
          The event has started!
        </Alert>
      );
    } else {
      const timeUnits = [
        { label: 'Days', value: days },
        { label: 'Hours', value: hours },
        { label: 'Minutes', value: minutes },
        { label: 'Seconds', value: seconds }
      ];

      return (
        <Grid container spacing={2}>
          {timeUnits.map((unit, index) => (
            <Grid item xs={3} sm={2.5} md={2} key={index}>
              <Card
                sx={{
                  backgroundColor: 'rgba(230, 74, 25, 0.04)',
                  border: '1px solid rgba(230, 74, 25, 0.1)',
                  borderRadius: 3,
                  textAlign: 'center',
                  py: 1.5,
                  boxShadow: 'none',
                  '&:hover': {
                    transform: 'none',
                    boxShadow: 'none',
                    borderColor: 'rgba(230, 74, 25, 0.3)',
                  }
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', fontFamily: "'Outfit', sans-serif" }}>
                  {String(unit.value).padStart(2, '0')}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.05em' }}>
                  {unit.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
    }
  };

  if (updatedEvents.length === 0) {
    return (
      <Box component="section" sx={{ py: { xs: 8, md: 10 }, background: 'transparent' }}>
        <Container maxWidth="md">
          <Box sx={{ borderRadius: 4, overflow: 'hidden', mb: 4, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)' }}>
            <img src={UpcomingBanner} alt="Upcoming Events" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </Box>
          <Card
            sx={{
              textAlign: 'center',
              p: { xs: 4, md: 6 },
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: 4,
              boxShadow: '0 15px 35px rgba(0,0,0,0.03)'
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
              Stay Tuned!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto', lineHeight: 1.6 }}>
              We are cooking up exciting new events and community celebrations. Check back soon for updates!
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/events"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(230, 74, 25, 0.2)',
              }}
            >
              Explore Past Events
            </Button>
          </Card>
        </Container>
      </Box>
    );
  }

  const event = updatedEvents[0]; 
  const { eventId, title, description, date, isOpen, image } = event;
  const eventDate = moment.tz(date, 'UTC');

  const handleRegister = (eventId, isOpen) => {
    if (isOpen) {
      navigate(`/${eventId}`);
    }
  };

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 10 }, background: 'transparent' }}>
      <Container maxWidth="lg">
        {/* Banner Header Image */}
        <Box sx={{ borderRadius: 4, overflow: 'hidden', mb: 6, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)' }}>
          <img src={UpcomingBanner} alt="Upcoming Events" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </Box>

        <Card
          sx={{
            background: '#ffffff',
            borderRadius: 4,
            border: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden',
          }}
        >
          <Grid container>
            {/* Left side: Image */}
            <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  zIndex: 2,
                }}
              >
                <Chip
                  label={isOpen ? "Registration Open" : "Coming Soon"}
                  color={isOpen ? "primary" : "default"}
                  sx={{
                    fontWeight: 800,
                    boxShadow: '0 4px 12px rgba(230, 74, 25, 0.2)',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                  }}
                />
              </Box>
              <Box
                component="img"
                src={image}
                alt={title}
                sx={{
                  width: '100%',
                  height: '100%',
                  minHeight: { md: 450 },
                  maxHeight: { xs: 350, md: 'none' },
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              />
            </Grid>

            {/* Right side: Event details & countdown */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: { xs: 4, md: 6 } }}>
              <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: '0.15em', mb: 1 }}>
                Event Spotlight
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '1.8rem', md: '2.5rem' }, letterSpacing: '-0.01em' }}>
                {title}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                  <CalendarToday fontSize="small" color="primary" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {eventDate.format('MMMM D, YYYY')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                  <AccessTime fontSize="small" color="primary" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {eventDate.format('h:mm A')} UTC
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
                {description}
              </Typography>

              {/* Countdown Widget */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2, color: 'text.primary', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Time Remaining:
                </Typography>
                <Countdown date={eventDate.toDate()} renderer={countdownRenderer} />
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {isOpen && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRegister(eventId, isOpen)}
                    sx={{
                      px: 5,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 700,
                      boxShadow: '0 6px 20px rgba(230, 74, 25, 0.3)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(230, 74, 25, 0.4)',
                      }
                    }}
                    endIcon={<ChevronRight />}
                  >
                    Register Now
                  </Button>
                )}
                
                <Button
                  variant="outlined"
                  component={Link}
                  to="/events"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 700,
                    borderColor: 'rgba(0, 0, 0, 0.15)',
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: '#e64a19',
                      color: '#e64a19',
                      backgroundColor: 'rgba(230, 74, 25, 0.04)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  View All Events
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default UpcomingEvent;
