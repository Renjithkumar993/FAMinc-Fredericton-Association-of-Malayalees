import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import moment from 'moment-timezone';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import { Container, Grid, Select, MenuItem, Button, Alert, AlertTitle, Typography, Box, FormControl, InputLabel, Link } from '@mui/material';
import './EventSection.css';
import Breadcrumbs from '../Breadcrumbs';
import HelmetWrapper from '../HelmetWrapper'; 
import Loading from '../Loading'; 

const iconMapping = {
  conference: 'fas fa-chalkboard-teacher',
  webinar: 'fas fa-video',
  workshop: 'fas fa-tools',
  social: 'fas fa-users',
};

const EventSection = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterYear, setFilterYear] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/config/events.json`); 
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const eventsData = await response.json();
        const updatedEvents = eventsData.map((event) => ({
          ...event,
          eventId: event.title.replace(/\s+/g, '').toLowerCase(),
        }));
        setEvents(updatedEvents);
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
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography color="error" variant="h5">Error: {error}</Typography>
      </Container>
    );
  }

  const handleRegister = (eventId, isOpen) => {
    if (isOpen) {
      navigate(`/${eventId}`);
    }
  };

  const handleYearChange = (e) => {
    setFilterYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setFilterMonth(e.target.value);
  };

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const yearMatches = filterYear === 'all' || eventDate.getFullYear().toString() === filterYear;
    const monthMatches = filterMonth === 'all' || (eventDate.getMonth() + 1).toString() === filterMonth;
    return yearMatches && monthMatches;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  // Extract unique years
  const uniqueYears = [...new Set(events.map(event => new Date(event.date).getFullYear()))].sort((a, b) => b - a);

  return (
    <Box sx={{ py: 6, mt: 8, minHeight: '100vh' }} className="event-section-page">
      <HelmetWrapper 
        pageTitle="Events - Fredericton Association of Malayalees" 
        description="Explore upcoming events at the Fredericton Association of Malayalees." 
      />
      <Container maxWidth="lg">
        <Breadcrumbs />
        
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 800, 
            mb: 4, 
            mt: 2, 
            letterSpacing: '-0.02em', 
            color: '#e64a19',
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          Our Events
        </Typography>

        <Alert 
          severity="info" 
          sx={{ 
            borderRadius: 3, 
            mb: 5,
            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
            border: '1px solid rgba(2, 136, 209, 0.12)'
          }}
        >
          <AlertTitle sx={{ fontWeight: 800 }}>FAM Membership</AlertTitle>
          For any membership details please reach out to <Link href="mailto:info@famnb.ca" sx={{ fontWeight: 700, color: '#0288d1', textDecoration: 'underline' }}>info@famnb.ca</Link>
        </Alert>

        {/* Filter Selection Panel */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="medium">
              <InputLabel id="year-filter-label">Filter by Year</InputLabel>
              <Select
                labelId="year-filter-label"
                value={filterYear}
                label="Filter by Year"
                onChange={handleYearChange}
                sx={{ borderRadius: 3, backgroundColor: 'white' }}
              >
                <MenuItem value="all">All Years</MenuItem>
                {uniqueYears.map(year => (
                  <MenuItem key={year} value={year.toString()}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="medium">
              <InputLabel id="month-filter-label">Filter by Month</InputLabel>
              <Select
                labelId="month-filter-label"
                value={filterMonth}
                label="Filter by Month"
                onChange={handleMonthChange}
                sx={{ borderRadius: 3, backgroundColor: 'white' }}
              >
                <MenuItem value="all">All Months</MenuItem>
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i + 1} value={(i + 1).toString()}>
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Timeline Grid */}
        <Box sx={{ mt: 2 }}>
          <VerticalTimeline lineColor="#e64a19">
            {filteredEvents.map((event, index) => {
              const eventDate = moment(event.date).tz('UTC').format('MMMM D, YYYY');
              const isOpen = event.isOpen;
              const eventIcon = iconMapping[event.type] || 'fas fa-calendar-alt';

              return (
                <VerticalTimelineElement
                  key={index}
                  iconStyle={{ 
                    background: isOpen ? '#2e7d32' : '#757575', 
                    color: 'white',
                    boxShadow: '0 0 0 4px #fff, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)'
                  }}
                  icon={<i className={eventIcon} style={{ fontSize: '1.25rem' }}></i>}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    padding: '24px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    backgroundColor: '#ffffff'
                  }}
                  contentArrowStyle={{ borderRight: '7px solid #ffffff' }}
                  date={eventDate}
                  dateClassName="custom-date"
                >
                  <Box className="event-card-content" sx={{ display: 'flex', gap: 3, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                    {event.image && (
                      <Box 
                        sx={{ 
                          width: { xs: '100%', sm: 120 }, 
                          height: 120, 
                          borderRadius: 3, 
                          overflow: 'hidden',
                          flexShrink: 0,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                          border: '1px solid rgba(0,0,0,0.08)'
                        }}
                      >
                        <Box
                          component="img"
                          src={event.image}
                          alt={event.title}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                    )}
                    <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
                      <Typography 
                        variant="h5" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 700, 
                          fontSize: '1.3rem', 
                          mb: 1.5,
                          color: 'text.primary'
                        }}
                      >
                        {event.title}
                      </Typography>
                      
                      <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <i className="fas fa-calendar-alt" style={{ color: '#e64a19', width: 16 }}></i> 
                          <strong>Date:</strong> {eventDate}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <i className="fas fa-clock" style={{ color: '#e64a19', width: 16 }}></i> 
                          <strong>Time:</strong> {event.time}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <i className="fas fa-map-marker-alt" style={{ color: '#e64a19', width: 16 }}></i> 
                          <strong>Location:</strong> {event.location}
                        </Typography>
                      </Box>

                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.5 }}>
                        {event.details}
                      </Typography>

                      <Button
                        variant="contained"
                        color={isOpen ? "success" : "inherit"}
                        disabled={!isOpen}
                        onClick={() => handleRegister(event.eventId, isOpen)}
                        sx={{
                          borderRadius: '20px',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          px: 3.5,
                          backgroundColor: isOpen ? '#2e7d32' : '#bdbdbd',
                          '&:hover': {
                            backgroundColor: isOpen ? '#1b5e20' : '#bdbdbd',
                          }
                        }}
                      >
                        {isOpen ? "Register" : "Registration Closed"}
                      </Button>
                    </Box>
                  </Box>
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        </Box>
      </Container>
    </Box>
  );
};

export default EventSection;
