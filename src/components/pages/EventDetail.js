import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate  } from 'react-router-dom';
import moment from 'moment-timezone';
import HelmetWrapper from '../HelmetWrapper';
import Breadcrumbs from '../Breadcrumbs';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTicketAlt, FaInfoCircle, FaClipboardList } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './EventDetail.css';

import EventSponsorImages from '../EventSponsorImages';





const ModalComponent = lazy(() => import('../ModalComponent'));
const Loading = lazy(() => import('../Loading'));


const images = {
  pookalamMavaliImage: `${process.env.PUBLIC_URL}/images/events/chenda1.gif`,
  mx8cxla2Image: `${process.env.PUBLIC_URL}/images/events/mx8cxla2.png`,
  pookalamGif: `${process.env.PUBLIC_URL}/images/events/pookalam.gif`,
  maveliResizeGif: `${process.env.PUBLIC_URL}/images/events/Maveli_resize.gif`,
};

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
      navigate('/404'); // Redirect to 404 if event is not found
    }
  }, [loading, error, event, navigate]);

  const handleModalClose = () => setModalType(null);
  const handleModalShow = (type) => setModalType(type);

  

  if (loading) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Loading />
      </Suspense>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading event details</h2>
        <p>{error}</p>
        <Button onClick={() => window.location.href = "/events"}>Go Back to Events</Button>
      </div>
    );
  }

  if (!event) {
    return null; // This case will never be hit because of the useEffect above
  }


  const eventClosed = new Date(event.date) < new Date();
  const eventDate = moment.tz(event.date, 'UTC');
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;

  return (
    <>
      <HelmetWrapper pageTitle={event.title} description={`Details for ${event.title}`} />
      <Container className="event-container">
        <div className="event-header text-center">
          <Breadcrumbs />
          {eventClosed && (
            <Alert variant="danger" className="text-center mb-4">
              Event closed.
            </Alert>
          )}
          
          <img
            src={images.maveliResizeGif}
            alt="Maveli"
            className="img-fluid"
          />
     
          <h2 className="event-title">{event.title}</h2>
        </div>
        <Row className="align-items-center  mb-4">
          
          <Col xs={12} md={6} className="event-image-container  mb-4 mb-md-0">
         
            <LazyLoadImage
              className="event-image"
              src={event.image}
              alt={event.title}
              effect="blur"
            />
       
          </Col>
          
          <Col xs={12} md={6}>
            <div className="event-info">
              <EventDetails event={event} eventDate={eventDate} googleMapsLink={googleMapsLink} />
              <EventActions event={event} handleModalShow={handleModalShow} />
            </div>
          </Col>

  
  
  
  
          <Col xs={12} sm={6} className='text-center'>
  <ActionButton
  
    text={"Get 50/50 Tickets"}
    onClick={() => navigate('/famonamgame')}
    disabled={!event.performanceIframe}
  />
</Col>
  
  





          
        </Row>
      </Container>
      <EventModals event={event} modalType={modalType} handleModalClose={handleModalClose} />
      
    </>
  );
};

const EventDetails = ({ event, eventDate, googleMapsLink }) => (
  <div className="event-details">
    <div className="event-info mb-2">
      <FaCalendarAlt className="event-icon" /> {eventDate.format('MMMM Do, YYYY')}
    </div>
    <div className="event-info mb-2">
      <FaClock className="event-icon" /> {event.time}
    </div>
    <div className="event-info mb-2">
      <FaMapMarkerAlt className="event-icon" /> <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">{event.location}</a>
    </div>
    <div className="event-info mt-4">
      <h5 className="mt-3">
        <FaInfoCircle className="event-icon" /> About the Event
      </h5>
      <p>{event.details}</p>
      {event.extraLinks && event.extraLinks.map((link, index) => (
        <p key={index}>
          <a href={link.url} target="_blank" rel="noopener noreferrer">{link.text}</a>
        </p>
      ))}
      {event.extraDetails && (
        <>
          <h5 className="mt-3">
            <FaClipboardList className="event-icon" /> Activities
          </h5>
  
  
  
  
  
  
  
          <ul className="mt-2" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            {event.extraDetails.activities.map((activity, index) => (
              <li key={index} style={{ marginBottom: '5px' }}>{activity}</li>
            ))}
          </ul>







          <p className="mt-2">{event.extraDetails.about}</p>
        </>
      )}
    </div>
  </div>
);

const EventActions = ({ event, handleModalShow}) => (
  <div className="event-actions text-center">
    <Row className="justify-content-center">
      <Col xs={12} sm={12} className="mb-2">
        <ActionButton
          text={event.formIframe ? "Get Tickets" : "Tickets Coming Soon"}
          icon={<FaTicketAlt className="event-icon" />}
          onClick={() => handleModalShow('form')}
          disabled={!event.formIframe}
        />
      </Col>
      <Col xs={12} sm={12}>
        <ActionButton
          text={event.performanceIframe ? "Performance Registration" : "Performance Registration Soon"}
          onClick={() => handleModalShow('performance')}
          disabled={!event.performanceIframe}
        />
      </Col>

    </Row>

    

  </div>
);

const ActionButton = ({ text, icon, onClick, disabled }) => (
  <Button
    variant="primary"
    className="event-button"
    onClick={onClick}
    disabled={disabled}
  >
    {icon} {text}
  </Button>
);

const EventModals = ({ event, modalType, handleModalClose }) => (
  <>
    {event.formIframe && (
      <Suspense fallback={<div>Loading...</div>}>
        <ModalComponent open={modalType === 'form'} handleClose={handleModalClose} iframeSrc={event.formIframe} />
      </Suspense>
    )}
    {event.performanceIframe && (
      <Suspense fallback={<div>Loading...</div>}>
        <ModalComponent open={modalType === 'performance'} handleClose={handleModalClose} iframeSrc={event.performanceIframe} />
      </Suspense>
    )}
    <EventSponsorImages />

  </>
);

export default EventDetail;
