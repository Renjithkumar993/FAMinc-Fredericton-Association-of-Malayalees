import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, Alert, Box } from '@mui/material';
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
    return <div>Error: {error}</div>;
  }

  const UpcomingBanner = `${process.env.PUBLIC_URL}/images/events/upcoming-banner.png`;
  const Maveli= `${process.env.PUBLIC_URL}/images/events/Maveli_resize.gif`;
  const pookalam = `${process.env.PUBLIC_URL}/images/events/pookalam.gif`;

  if (updatedEvents.length === 0) {
    return (
      <Container maxWidth="md" style={{ textAlign: 'center', padding: '2rem 0' }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <img src={UpcomingBanner} alt="Upcoming Events" style={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" component="div" gutterBottom>
              Stay Tuned!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              We are working on exciting new events. Check back soon for updates!
            </Typography>
            <Alert severity="info" style={{ marginTop: '1rem' }}>
              Check out our <Link to="/events">Past Events</Link>
            </Alert>
          </Grid>
        </Grid>
      </Container>
    );
  }

  const event = updatedEvents[0]; 
  const { eventId, title, description, date, isOpen, image } = event;
  const eventDate = moment.tz(date, 'UTC');

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Typography variant="body1">The event has started!</Typography>;
    } else {
      return (
        <Grid container spacing={2} justifyContent="center" style={{ marginTop: '1rem' }}>
          <Grid item>
            <Typography variant="h5" style={{ color: '#ff6341' }}>{days}</Typography>
            <Typography variant="body2" style={{ color: '#ff6341' }}>Days</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" style={{ color: '#ff6341' }}>{hours}</Typography>
            <Typography variant="body2" style={{ color: '#ff6341' }}>Hours</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" style={{ color: '#ff6341' }}>{minutes}</Typography>
            <Typography variant="body2" style={{ color: '#ff6341' }}>Minutes</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" style={{ color: '#ff6341' }}>{seconds}</Typography>
            <Typography variant="body2" style={{ color: '#ff6341' }}>Seconds</Typography>
          </Grid>
        </Grid>
      );
    }
  };

  const handleRegister = (eventId, isOpen) => {
    if (isOpen) {
      navigate(`/${eventId}`);
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12}>
          <img src={UpcomingBanner} alt="Upcoming Events" style={{ width: '100%', height: 'auto' }} />
        </Grid>
        <Grid container item xs={12} justifyContent="center" alignItems="center">
        
          <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={image} alt={title} className="event-image" style={{ width: '100%' }} />
          </Grid>
          <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={pookalam} alt={title} className="event-image" style={{ width: '100%' }} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" className="text-center bold-text">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph style={{ textAlign: 'center' }}>
            {description}
          </Typography>
          <Typography variant="h6" color="text.primary" gutterBottom style={{ color: 'rgb(240, 21, 21)', textAlign: 'center' }}>
            {eventDate.format('MMMM D, YYYY')}
          </Typography>
          <Box display="flex" justifyContent="center" marginTop={0}>
            <Countdown date={eventDate.toDate()} renderer={countdownRenderer} />
          </Box>
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: '#ff6341', borderRadius: '25px' }}
              onClick={() => handleRegister(eventId, isOpen)}
            >
              Register
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Alert severity="info">
            Check out our <Link to="/events">Past Events</Link>
          </Alert>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpcomingEvent;
