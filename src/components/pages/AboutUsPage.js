import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Fade, Slide, Zoom } from 'react-awesome-reveal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FullWidthImage from '../FullWidthImage';
import Breadcrumbs from '../Breadcrumbs';
import HelmetWrapper from '../HelmetWrapper';
import JoinComponent from '../JoinComponent';
import Loading from '../Loading';

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
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  const aboutImage1 = `${process.env.PUBLIC_URL}/images/fredericton/Fredericton-image-1.jpg`;
  const aboutImage2 = `${process.env.PUBLIC_URL}/images/fredericton/Fredericton-image-2.jpg`;

  return (
    <>
      <HelmetWrapper 
        pageTitle="About Us - Fredericton Association of Malayalees" 
        description="Learn more about the Fredericton Association of Malayalees." 
      />
      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <Breadcrumbs />
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12}>
              <Fade triggerOnce={false} direction="down" duration={500}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                  About{' '}
                  <Box component="span" sx={{ color: '#ff6341' }}>
                    Fredericton Association of Malayalees
                  </Box>
                </Typography>
              </Fade>
            </Grid>

            <Grid item xs={12} md={6}>
              <Fade triggerOnce={false} direction="right" duration={500}>
                <Box>
                  {aboutData.about.description.map((paragraph, index) => (
                    <Typography key={index} variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                      {paragraph}
                    </Typography>
                  ))}
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={6}>
              <Zoom triggerOnce={false} duration={700}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderRadius: 2, boxShadow: 3 }}>
                  <img src={aboutImage1} alt="About Us" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                </Box>
              </Zoom>
            </Grid>

            <Grid item xs={12}>
              <Slide triggerOnce={false} direction="left" duration={500}>
                <Grid container spacing={2}>
                  {aboutData.about.statistics.map((stat, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <List>
                        {stat.list.map((item, idx) => (
                          <ListItem key={idx} sx={{ paddingLeft: 0 }}>
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                              <CheckCircleIcon sx={{ color: '#ff6341', fontSize: '1.5rem' }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{ fontSize: '1.2rem', fontWeight: 'medium', letterSpacing: '0.5px' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  ))}
                </Grid>
              </Slide>
            </Grid>

            <Grid item xs={12} md={6}>
              <Zoom triggerOnce={false} duration={700}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderRadius: 2, boxShadow: 3 }}>
                  <img src={aboutImage2} alt="Activities" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                </Box>
              </Zoom>
            </Grid>

            <Grid item xs={12} md={6}>
              <Fade triggerOnce={false} direction="left" duration={500}>
                <Box>
                  <Typography variant="h4" gutterBottom sx={{ color: '#ff6341', fontWeight: 'bold' }}>
                    Fredericton Association of Malayalees
                  </Typography>
                  {aboutData.about.additionalSection.paragraphs.map((paragraph, index) => (
                    <Typography key={index} variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                      {paragraph}
                    </Typography>
                  ))}
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={6}>
              <Slide triggerOnce={false} direction="left" duration={500}>
                <Box>
                  <Typography variant="h4" gutterBottom sx={{ color: '#ff6341', fontWeight: 'bold' }}>
                    Our Mission
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    {missionVisionData.missionVision.mission}
                  </Typography>
                </Box>
              </Slide>
            </Grid>

            <Grid item xs={12} md={6}>
              <Slide triggerOnce={false} direction="right" duration={500}>
                <Box>
                  <Typography variant="h4" gutterBottom sx={{ color: '#ff6341', fontWeight: 'bold' }}>
                    Our Vision
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    {missionVisionData.missionVision.vision}
                  </Typography>
                </Box>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <JoinComponent />
      <FullWidthImage />
    </>
  );
};

export default AboutUsPage;
