import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Steps.css';
import WhatWeDo from './WhatWeDo';


const eventIcon = (`${process.env.PUBLIC_URL}/images/icons/event.png`);
const volunteeringIcon = (`${process.env.PUBLIC_URL}/images/icons/Volunteering.png`);
const connectedIcon = (`${process.env.PUBLIC_URL}/images/icons/connected.png`);

const Steps = () => {



  useEffect(() => {
    // Ensure ScrollTrigger refresh to recalculate positions
    setTimeout(() => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    }, 100);
  }, []);

  return (
    <section className="step-section" id="about">
      <Container>
        <Row className="">
          <Col xs={12} md={6} className="order-1 order-md-1">
            <div className="step-text">
              <h1>Get Involved <span className='hilite-color'>With Us</span></h1>
              <h2>Join Our Vibrant Malayalee Community in Fredericton</h2>
              <ul className="activity-list">
                <li><img src={eventIcon} alt="Event" className="activity-icon" /> Join us at various cultural events, gatherings, and celebrations organized by the association.</li>
                <li><img src={volunteeringIcon} alt="Volunteering" className="activity-icon" /> Get involved by volunteering for different roles and activities within the association.</li>
                <li><img src={connectedIcon} alt="Connected" className="activity-icon" />  Stay updated with the latest news, announcements, and activities by following our social media channels.</li>
              </ul>
            </div>
          </Col>
          <Col xs={12} md={6} className="order-2 order-md-2">
            <WhatWeDo />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Steps;
