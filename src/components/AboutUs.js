import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, Typography } from '@mui/material';
import { Slide, Zoom } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css'; 
import Loading from './Loading'; 

const AboutUs = () => {
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
    <section className="about-us-section" id="about">
      <Container >
        <Grid container alignItems="center" spacing={4}>
          <Grid item xs={12} md={6} className="about-text-grid">
            <Slide direction="left" duration={700} triggerOnce={false}>
              <div className="about-text">
                <Typography variant="h3" className="highlight">
                  <span className="hilite-color">Malayalee</span> Community
                </Typography>
                <Typography variant="h5" className="subtitle">
                  Celebrating Kerala Culture in Fredericton, New Brunswick, Canada
                </Typography>
                {data.about.description.map((paragraph, index) => (
                  <Typography key={index} variant="body1" className="paragraph">
                    {paragraph}
                  </Typography>
                ))}
                <Button
                  variant="outlined"
                  
                  className="custom-button"
                  onClick={() => navigate('/contactus')}
                >
                  Get in touch
                </Button>
              </div>
            </Slide>
          </Grid>
          <Grid item xs={12} md={6}>
            <Zoom duration={700} triggerOnce={false}>
              <img src={aboutImage} alt="Mission and Vision" className="about-image" />
            </Zoom>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default AboutUs;
