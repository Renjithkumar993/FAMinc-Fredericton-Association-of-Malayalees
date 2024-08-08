import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import moment from 'moment-timezone';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
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
    return <Loading />; // Use your custom Loading component
  }

  if (error) {
    return <div>Error: {error}</div>;
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

  return (
    <div className="event-section-page">
      <HelmetWrapper 
        pageTitle="Events - Fredericton Association of Malayalees" 
        description="Explore upcoming events at the Fredericton Association of Malayalees." 
      />
      <Container className="event-section">
        <Breadcrumbs /> {/* Add Breadcrumbs here */}
        <h1 className="event-heading">Our Events</h1>
        <Alert variant="info" className="membership-alert">
          <h4>FAM – Membership</h4>
          <p>For any membership details please reach out to info@famnb.ca</p>
        </Alert>
        <Row className="filter-row mb-4 mt-5">
          <Col md={6}>
            <Form.Control as="select" value={filterYear} onChange={handleYearChange} className='mt-2' >
              <option value="all">All Years</option>
              {[...new Set(events.map(event => new Date(event.date).getFullYear()))].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Form.Control>
          </Col>
          <Col md={6}>
            <Form.Control as="select" value={filterMonth} onChange={handleMonthChange} className='mt-2'>
              <option value="all">All Months</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
              ))}
            </Form.Control>
          </Col>
        </Row>
        <VerticalTimeline>
          {filteredEvents.map((event, index) => {
            const eventDate = moment(event.date).tz('UTC').format('MMMM D, YYYY');
            const isOpen = event.isOpen;
            const eventIcon = iconMapping[event.type] || 'fas fa-calendar-alt';

            return (
              <VerticalTimelineElement
                key={index}
                iconStyle={{ background: isOpen ? 'green' : 'gray', color: 'white' }}
                icon={<i className={eventIcon}></i>}
                contentStyle={{ borderRadius: '15px', position: 'relative', padding: '20px' }}  // Add border radius to content box
                dateClassName="custom-date"
              >
                <div className="event-card-content">
                  {event.image && (
                    <div className="event-timeline-image">
                      <img src={event.image} alt={event.title} className="timeline-image" />
                    </div>
                  )}
                  <div className="event-card-details ">
                    <h3 className="vertical-timeline-element-title">{event.title}</h3>
                    <div className="event-additional-details">
                      <p><i className="fas fa-calendar-alt"></i> <strong>Date:</strong> {eventDate}</p>
                      <p><i className="fas fa-clock"></i> <strong>Time:</strong> {event.time}</p>
                      <p><i className="fas fa-map-marker-alt"></i> <strong>Location:</strong> {event.location}</p>
                    </div>
                    <p>{event.details}</p>
                    <Button
                      className='registrationButton'
                      variant={isOpen ? "success" : "danger"}
                      disabled={!isOpen}
                      onClick={() => handleRegister(event.eventId, isOpen)}
                    >
                      {isOpen ? "Register" : "Registration Closed"}
                    </Button>
                  </div>
                </div>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </Container>
    </div>
  );
};

export default EventSection;
