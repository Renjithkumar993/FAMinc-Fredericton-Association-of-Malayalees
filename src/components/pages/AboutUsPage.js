import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AboutUsPage.css';
import FullWidthImage from '../FullWidthImage';
import Breadcrumbs from '../Breadcrumbs';
import HelmetWrapper from '../HelmetWrapper';
import JoinComponent from '../JoinComponent';
import Loading from '../Loading'; // Ensure this is the correct path to your Loading component
import { motion } from 'framer-motion';

const AboutUsPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [missionVisionData, setMissionVisionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const [aboutResponse, missionVisionResponse] = await Promise.all([
          fetch(`${process.env.PUBLIC_URL}/config/aboutus.json`),
          fetch(`${process.env.PUBLIC_URL}/config/missionvission.json`)
        ]);

        if (!aboutResponse.ok || !missionVisionResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const aboutData = await aboutResponse.json();
        const missionVisionData = await missionVisionResponse.json();

        setAboutData(aboutData);
        setMissionVisionData(missionVisionData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const aboutImage1 = `${process.env.PUBLIC_URL}/images/fredericton/Fredericton-image-1.jpg`;
  const aboutImage2 = `${process.env.PUBLIC_URL}/images/fredericton/Fredericton-image-2.jpg`;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <>
      <HelmetWrapper 
        pageTitle="About Us - Fredericton Association of Malayalees" 
        description="Learn more about the Fredericton Association of Malayalees." 
      />
      <div className="about-us-page">
        <Container className="about-us-content">
          <Breadcrumbs />
          <Row className="mb-1">
            <Col>
              <motion.h1 
                className="about-heading"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                About Fredericton Association of Malayalees
              </motion.h1>
            </Col>
          </Row>
          <Row className='align-items-center'>
            <Col md={6}>
              <motion.div 
                className="about-description"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                {aboutData.about.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </motion.div>
            </Col>
            <Col md={6}>
              <motion.div 
                className="image-container"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.6 }}
              >
                <img src={aboutImage1} alt="About Us" className="about-image" />
              </motion.div>
            </Col>
          </Row>
          <Row className="statistics mt-4">
            {aboutData.about.statistics.map((stat, index) => (
              <Col md={6} key={index}>
                <motion.div 
                  className="stat-item"
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  transition={{ duration: 0.6 }}
                >
                  <ul>
                    {stat.list.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              </Col>
            ))}
          </Row>
          <Row className="mt-5 align-items-center">
            <Col md={6}>
              <motion.div 
                className="image-container"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.6 }}
              >
                <img src={aboutImage2} alt="Activities" className="about-image" />
              </motion.div>
            </Col>
            <Col md={6}>
              <motion.div 
                className="mission-description"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                <h2>Fredericton Association of Malayalees</h2>
                {aboutData.about.additionalSection.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </motion.div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={6}>
              <motion.div 
                className="mission-vision"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                <h2>Our Mission</h2>
                <p>{missionVisionData.missionVision.mission}</p>
              </motion.div>
            </Col>
            <Col md={6}>
              <motion.div 
                className="mission-vision"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.6 }}
              >
                <h2>Our Vision</h2>
                <p>{missionVisionData.missionVision.vision}</p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>
      <JoinComponent />
      <FullWidthImage />
    </>
  );
};

export default AboutUsPage;
