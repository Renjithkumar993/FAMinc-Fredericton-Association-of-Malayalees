import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';
import { Container, Grid, Button, Alert, Typography, Box, Paper, List, ListItem, ListItemIcon, ListItemText, Divider, Link } from '@mui/material';
import { CalendarMonth, AccessTime, Place, Info, FormatListBulleted, ConfirmationNumber, HowToReg } from '@mui/icons-material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import HelmetWrapper from '../HelmetWrapper';
import Breadcrumbs from '../Breadcrumbs';
import EventSponsorImages from '../EventSponsorImages';
import './EventDetail.css';

const ModalComponent = lazy(() => import('../ModalComponent'));
const Loading = lazy(() => import('../Loading'));

const fetchEventData = async (eventId, setEvent, setLoading, setError) => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/config/events.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const eventsData = await response.json();
    const event = eventsData.find(event => event.title.replace(/\s+/g, '').toLowerCase() === eventId);
    setEvent(event);
    setLoading(false);
  } catch (error) {
    setError(error.message);
    setLoading(false);
  }
};

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    fetchEventData(eventId, setEvent, setLoading, setError);
  }, [eventId]);

  useEffect(() => {
    if (!loading && !error && !event) {
      navigate('/404');
    }
  }, [loading, error, event, navigate]);

  const handleModalClose = () => setModalType(null);
  const handleModalShow = (type) => setModalType(type);

  if (loading) {
    return (
      <Suspense fallback={<Typography align="center" sx={{ py: 10 }}>Loading...</Typography>}>
        <Loading />
      </Suspense>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>Error loading event details</Typography>
        <Typography sx={{ mb: 4 }}>{error}</Typography>
        <Button variant="contained" onClick={() => navigate('/events')}>Go Back to Events</Button>
      </Container>
    );
  }

  if (!event) {
    return null;
  }

  const eventClosed = new Date(event.date) < new Date();
  const eventDate = moment.tz(event.date, 'UTC');
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;

  return (
    <>
      <HelmetWrapper pageTitle={event.title} description={`Details for ${event.title}`} />
      
      <Box sx={{ py: 6, mt: 8, minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Breadcrumbs />
          </Box>
          
          {eventClosed && (
            <Alert severity="error" sx={{ mb: 4, borderRadius: 3 }}>
              This event is closed.
            </Alert>
          )}

          <Grid container spacing={5} alignItems="flex-start">
            {/* Left Column: Event Image */}
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0}
                sx={{ 
                  borderRadius: 4, 
                  overflow: 'hidden', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <LazyLoadImage
                  className="event-image"
                  src={event.image}
                  alt={event.title}
                  effect="blur"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </Paper>
            </Grid>

            {/* Right Column: Event Info & Actions */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  border: '1px solid rgba(0,0,0,0.06)',
                  backgroundColor: '#ffffff',
                }}
              >
                <Typography 
                  variant="h4" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 800, 
                    mb: 3,
                    color: 'text.primary',
                    fontSize: { xs: '1.8rem', md: '2.4rem' }
                  }}
                >
                  {event.title}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CalendarMonth color="primary" />
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {eventDate.format('MMMM Do, YYYY')}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AccessTime color="primary" />
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {event.time}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Place color="primary" />
                    <Link 
                      href={googleMapsLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      sx={{ 
                        color: 'primary.main', 
                        fontWeight: 600, 
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' } 
                      }}
                    >
                      {event.location}
                    </Link>
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* About Section */}
                <Box sx={{ mb: 4, textAlign: 'left' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Info color="primary" /> About the Event
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
                    {event.details}
                  </Typography>

                  {event.extraLinks && event.extraLinks.map((link, index) => (
                    <Box key={index} sx={{ mt: 1 }}>
                      <Link 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        sx={{ color: '#0288d1', fontWeight: 600, textDecoration: 'underline' }}
                      >
                        {link.text}
                      </Link>
                    </Box>
                  ))}
                </Box>

                {/* Activities Section */}
                {event.extraDetails && (
                  <Box sx={{ mb: 4, textAlign: 'left' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                      <FormatListBulleted color="primary" /> Activities
                    </Typography>
                    <List dense disablePadding sx={{ mb: 2 }}>
                      {event.extraDetails.activities.map((activity, index) => (
                        <ListItem key={index} disableGutters sx={{ alignItems: 'flex-start', py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 28, mt: '4px' }}>
                            <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'primary.main' }} />
                          </ListItemIcon>
                          <ListItemText primary={activity} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                        </ListItem>
                      ))}
                    </List>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {event.extraDetails.about}
                    </Typography>
                  </Box>
                )}

                <Divider sx={{ my: 3 }} />

                {/* Event Actions */}
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={!event.formIframe || eventClosed}
                      onClick={() => handleModalShow('form')}
                      startIcon={<ConfirmationNumber />}
                      sx={{
                        py: 1.5,
                        fontWeight: 700,
                        boxShadow: '0 6px 18px rgba(230,74,25,0.25)',
                      }}
                    >
                      {event.formIframe ? "Get Tickets" : "Tickets Coming Soon"}
                    </Button>
                  </Grid>
                  {event.performanceIframe && (
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        disabled={eventClosed}
                        onClick={() => handleModalShow('performance')}
                        startIcon={<HowToReg />}
                        sx={{
                          py: 1.5,
                          fontWeight: 700,
                          borderWidth: '2px',
                          '&:hover': { borderWidth: '2px' },
                        }}
                      >
                        Performance Registration
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Modals Container */}
      {event.formIframe && (
        <Suspense fallback={<Typography align="center" sx={{ py: 4 }}>Loading...</Typography>}>
          <ModalComponent open={modalType === 'form'} handleClose={handleModalClose} iframeSrc={event.formIframe} />
        </Suspense>
      )}
      {event.performanceIframe && (
        <Suspense fallback={<Typography align="center" sx={{ py: 4 }}>Loading...</Typography>}>
          <ModalComponent open={modalType === 'performance'} handleClose={handleModalClose} iframeSrc={event.performanceIframe} />
        </Suspense>
      )}

      {/* Sponsors component */}
      <Box sx={{ mt: 6, borderTop: '1px solid rgba(0,0,0,0.06)', backgroundColor: 'rgba(0,0,0,0.01)' }}>
        <EventSponsorImages />
      </Box>
    </>
  );
};

export default EventDetail;
