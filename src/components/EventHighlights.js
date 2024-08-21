import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const EventHighlights = () => {
  const [events, setEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/config/events.json`)
      .then(response => response.json())
      .then(data => {
        const pastEvents = data.filter(event => !event.isOpen && !event.upcomingEvent);
        setEvents(pastEvents);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [events]);

  const handlePrevEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  const handleNextEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8, textAlign: 'center' }}>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 4, color: '#ff6341' }}>
        Past Events
      </Typography>
      {events.length > 0 && (
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <Box
            sx={{
              display: 'flex',
              transition: 'transform 0.5s ease-in-out',
              transform: `translateX(-${currentEventIndex * 100}%)`,
              width: `${events.length * 100}%`,
            }}
          >
            {events.map((event, index) => (
              <Card
                key={index}
                sx={{
                  flex: '0 0 100%',
                  backgroundColor: '#0c1a2c',
                  color: 'white',
             
                  mx: 'auto',
                  transition: 'transform 0.5s ease-in-out',
                  transform: `scale(${index === currentEventIndex ? 1 : 0.9})`,
                }}
              >
                <CardMedia
                  component="img"
                  image={event.image || '/images/default-event.jpg'}
                  alt={event.title}
                  sx={{ height: 300, borderRadius: '15px 15px 0 0' }}
                />
                <CardContent sx={{ padding: 3 }}>
                  <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#ff6341' }}>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'lightgray', mb: 2 }}>
                    {event.date} | {event.time}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'lightgray' }}>
                    {event.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          <IconButton
            onClick={handlePrevEvent}
            sx={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              '&:hover': {
                color: '#ff6341',
              },
            }}
          >
            <ArrowBackIos />
          </IconButton>
          <IconButton
            onClick={handleNextEvent}
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              '&:hover': {
                color: '#ff6341',
              },
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      )}
    </Container>
  );
};

export default EventHighlights;
