import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import './AboutUs.css';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading'; // Ensure this is the correct path to your Loading component

const AboutUs = () => {
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/config/aboutus.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const aboutImage = `${process.env.PUBLIC_URL}/images/heroimages/Aboutus-hero.png`;

  return (
    <section className={`about-us-section ${aboutInView ? 'animate' : ''}`} ref={aboutRef} id="about">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="order-1 order-md-2">
            <div className="about-text">
              <h1><span className='hilite-color'>Malayalee</span> Community</h1>
              <h2>Celebrating Kerala Culture in Fredericton, Canada</h2>
              {data.about.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <Button variant="outline-dark mb-5" onClick={() => navigate('/contactus')}>Get in touch</Button>
            </div>
          </Col>
          <Col xs={12} md={6} className="order-2 order-md-1">
            <img src={aboutImage} alt="Mission and Vision" className="mv-mission-image img-fluid" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
