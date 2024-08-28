import React, { useEffect, useState } from 'react';
import { Grid, Box, Button, Container, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import './MissionVision.css';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading'; // Ensure this is the correct path to your Loading component

const TEXTS = ['MISSION', 'VISION'];

const MissionVision = () => {
  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: false,
  });

  const { ref: imageRef, inView: imageInView } = useInView({
    triggerOnce: false,
  });

  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [missionVisionData, setMissionVisionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMissionVisionData = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/config/missionvission.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setMissionVisionData(data.missionVision);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchMissionVisionData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex(index => (index + 1) % TEXTS.length);
    }, 5000); // Change the word every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const missionImage = `${process.env.PUBLIC_URL}/images/heroimages/MissionVission-Hero.png`;

  return (
    <div className="mv-section" id="mission">
      <Container>
        <Grid container alignItems="center">
          <Grid item md={6} ref={textRef}>
            <motion.div
              className="mv-text-container"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: textInView ? 0 : 100, opacity: textInView ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h4"style={{ fontWeight: 'bold' }}>
                OUR <span className="highlight-text" >
                  <Typewriter
                    words={['MISSION']}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    typeSpeed={50}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </span>
              </Typography>
              <Typography>{missionVisionData.mission}</Typography>
              <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                OUR <span className="highlight-text">
                  <Typewriter
                    words={['VISION']}
                    loop={true}
                    cursor
                    cursorStyle="_"
                    typeSpeed={100}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </Typography>
              <Typography>{missionVisionData.vision}</Typography>
              <Button
                variant="contained"
                color="primary"
                className="mv-read-more-btn mb-4"
                onClick={() => navigate('/aboutus')}
              >
                Read More
              </Button>
            </motion.div>
          </Grid>
          <Grid item md={6} ref={imageRef}>
            <motion.div
              className="mv-image-container"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: imageInView ? 0 : -100, opacity: imageInView ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={missionImage} alt="Mission and Vision" className="mv-mission-image img-fluid" />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MissionVision;
