import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Zoom, Slide } from 'react-awesome-reveal';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css';
import Loading from './Loading'; // Ensure this is the correct path to your Loading component

const AboutUs = () => {
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: false, // Animation triggers every time in view
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
    <section ref={aboutRef} className={`about-us-section ${aboutInView ? 'animate' : ''}`} id="about">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="order-1 order-md-2">
            <div className="about-text">
              <Zoom delay={0.2} triggerOnce={false}>
                <h1><span className="hilite-color">Malayalee</span> Community</h1>
              </Zoom>
              <Zoom delay={0.4} triggerOnce={false}>
                <h2>Celebrating Kerala Culture in Fredericton, New Brunswick, Canada</h2>
              </Zoom>
              {data.about.description.map((paragraph, index) => (
                <Zoom key={index} delay={0.6 + index * 0.2} triggerOnce={false}>
                  <p>{paragraph}</p>
                </Zoom>
              ))}
              <Zoom delay={0.8 + data.about.description.length * 0.2} triggerOnce={false}>
                <Button
                  variant="outline-dark"
                  className="custom-button"
                  onClick={() => navigate('/contactus')}
                >
                  Get in touch
                </Button>
              </Zoom>
            </div>
          </Col>
          <Col xs={12} md={6} className="order-2 order-md-1">
            <Slide direction="right" triggerOnce={false}>
              <img src={aboutImage} alt="Mission and Vision" className="about-image" />
            </Slide>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
