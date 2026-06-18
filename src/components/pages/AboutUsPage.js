import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, List, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { Fade, Slide, Zoom } from 'react-awesome-reveal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlagIcon from '@mui/icons-material/Flag';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  const aboutImage1 = `${process.env.PUBLIC_URL}/images/fredericton/Fredericton-image-1.jpg`;
  const aboutImage2 = `${process.env.PUBLIC_URL}/images/fredericton/Fredericton-image-2.jpg`;

  return (
    <>
      <HelmetWrapper 
        pageTitle="About Us - Fredericton Association of Malayalees" 
        description="Learn more about the Fredericton Association of Malayalees." 
      />
      <Box sx={{ py: 6, mt: 8, minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Breadcrumbs />
          </Box>

          <Grid container spacing={6} alignItems="center">
            {/* Title */}
            <Grid item xs={12}>
              <Fade triggerOnce={false} direction="down" duration={500}>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 800, 
                    textAlign: 'center', 
                    letterSpacing: '-0.02em',
                    fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' }
                  }}
                >
                  About{' '}
                  <Box component="span" sx={{ color: 'primary.main' }}>
                    Fredericton Association of Malayalees
                  </Box>
                </Typography>
              </Fade>
            </Grid>

            {/* Description & Image 1 */}
            <Grid item xs={12} md={6}>
              <Fade triggerOnce={false} direction="right" duration={500}>
                <Box sx={{ textAlign: 'left' }}>
                  {aboutData.about.description.map((paragraph, index) => (
                    <Typography 
                      key={index} 
                      variant="body1" 
                      sx={{ 
                        lineHeight: 1.8, 
                        mb: 2.5, 
                        color: 'text.secondary',
                        fontSize: '1.05rem' 
                      }}
                    >
                      {paragraph}
                    </Typography>
                  ))}
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={6}>
              <Zoom triggerOnce={false} duration={700}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    overflow: 'hidden', 
                    borderRadius: 4, 
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                    border: '1px solid rgba(0,0,0,0.06)'
                  }}
                >
                  <Box 
                    component="img" 
                    src={aboutImage1} 
                    alt="About Us Group" 
                    sx={{ width: '100%', height: 'auto', display: 'block' }} 
                  />
                </Paper>
              </Zoom>
            </Grid>

            {/* Statistics Bullet Grid */}
            <Grid item xs={12}>
              <Slide triggerOnce={false} direction="left" duration={500}>
                <Grid container spacing={3}>
                  {aboutData.about.statistics.map((stat, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <List disablePadding>
                        {stat.list.map((item, idx) => (
                          <Paper
                            key={idx}
                            elevation={0}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              p: 2,
                              mb: 2,
                              borderRadius: 3,
                              backgroundColor: 'rgba(230, 74, 25, 0.02)',
                              border: '1px solid rgba(230, 74, 25, 0.05)',
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <CheckCircleIcon sx={{ color: 'primary.main', fontSize: '1.4rem' }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{ 
                                fontSize: '1.05rem', 
                                fontWeight: 600, 
                                color: 'text.primary',
                                textAlign: 'left'
                              }}
                            />
                          </Paper>
                        ))}
                      </List>
                    </Grid>
                  ))}
                </Grid>
              </Slide>
            </Grid>

            {/* Activities Section & Image 2 */}
            <Grid item xs={12} md={6}>
              <Zoom triggerOnce={false} duration={700}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    overflow: 'hidden', 
                    borderRadius: 4, 
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                    border: '1px solid rgba(0,0,0,0.06)'
                  }}
                >
                  <Box 
                    component="img" 
                    src={aboutImage2} 
                    alt="Activities Group" 
                    sx={{ width: '100%', height: 'auto', display: 'block' }} 
                  />
                </Paper>
              </Zoom>
            </Grid>

            <Grid item xs={12} md={6}>
              <Fade triggerOnce={false} direction="left" duration={500}>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 800, mb: 2.5, letterSpacing: '-0.01em' }}>
                    Fredericton Association of Malayalees
                  </Typography>
                  {aboutData.about.additionalSection.paragraphs.map((paragraph, index) => (
                    <Typography 
                      key={index} 
                      variant="body1" 
                      sx={{ 
                        lineHeight: 1.8, 
                        mb: 2.5, 
                        color: 'text.secondary',
                        fontSize: '1.05rem' 
                      }}
                    >
                      {paragraph}
                    </Typography>
                  ))}
                </Box>
              </Fade>
            </Grid>

            {/* Mission & Vision Cards */}
            <Grid item xs={12} md={6}>
              <Slide triggerOnce={false} direction="left" duration={500}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    border: '1px solid rgba(0,0,0,0.06)',
                    backgroundColor: '#ffffff',
                    height: '100%',
                    textAlign: 'left'
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: 'primary.main', 
                      fontWeight: 800, 
                      mb: 2, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1.5 
                    }}
                  >
                    <FlagIcon /> Our Mission
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '1.025rem' }}>
                    {missionVisionData.missionVision.mission}
                  </Typography>
                </Paper>
              </Slide>
            </Grid>

            <Grid item xs={12} md={6}>
              <Slide triggerOnce={false} direction="right" duration={500}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    border: '1px solid rgba(0,0,0,0.06)',
                    backgroundColor: '#ffffff',
                    height: '100%',
                    textAlign: 'left'
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: 'primary.main', 
                      fontWeight: 800, 
                      mb: 2, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1.5 
                    }}
                  >
                    <VisibilityIcon /> Our Vision
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '1.025rem' }}>
                    {missionVisionData.missionVision.vision}
                  </Typography>
                </Paper>
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
