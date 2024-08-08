import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactUs.css';
import Breadcrumbs from '../Breadcrumbs'; // Import Breadcrumbs component
import HelmetWrapper from '../HelmetWrapper'; // Import HelmetWrapper for SEO

const ContactUs = () => {
  const logofam = `${process.env.PUBLIC_URL}/images/logofam.jpg`; 
  return (
    <div className="contact-us-page">
      <HelmetWrapper 
        pageTitle="Contact Us - Fredericton Association of Malayalees" 
        description="Get in touch with the Fredericton Association of Malayalees." 
      />

      <div className="hero-banner">
        <Container>
          <Row>
            <Col>
              <h1>Contact Us</h1>
              <p>Get in touch with the Fredericton Association of Malayalees</p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Breadcrumbs />
        <div className="contact-us-container">
          <Row>
            <Col md={6} className="left-col">
              <img src={logofam} alt="Logo" className="logo-image" />
            </Col>
            <Col md={6} className="right-col">
              <h2 className="contactushead">Our Contact Details</h2>
              <div className="contact-info">
                <p>Feel free to reach out to us with any questions or concerns. We are here to help!</p>
                <p><strong>Email:</strong> <a href="mailto:info@famnb.ca" className="contact-link">info@famnb.ca</a></p>
                <p><strong>Address:</strong> Fredericton, NB</p>
          
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17914.883066472462!2d-66.65849926606492!3d45.96358997910885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ca43ae1f0f3b7a5%3A0x32a4958fdbb5a905!2sFredericton%2C%20NB!5e0!3m2!1sen!2sca!4v1605295357034!5m2!1sen!2sca"
          width="100%"
          height="450"
          allowFullScreen=""
          tabIndex="0"
          frameBorder="0"
          style={{ border: 0 }}
          title="Fredericton Association of Malayalees Location Map" // Added unique title for accessibility
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
