import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardActionArea, Box, IconButton, Collapse, List, ListItem, ListItemText } from '@mui/material';
import { ExpandMore, LocationCity, Work, AccountBalance, LocalHospital, ChildCare, Groups, CreditCard, Apartment } from '@mui/icons-material';
import { Zoom } from 'react-awesome-reveal';

const iconMapping = {
  LocationCity: <LocationCity />,
  Work: <Work />,
  AccountBalance: <AccountBalance />,
  LocalHospital: <LocalHospital />,
  ChildCare: <ChildCare />,
  Groups: <Groups />,
  CreditCard: <CreditCard />,
  Apartment: <Apartment />
};

const UsefulLinks = () => {
  const [data, setData] = useState(null);
  const [expandedHealth, setExpandedHealth] = useState(false);
  const [expandedEmployment, setExpandedEmployment] = useState(false);
  const [expandedImmigrant, setExpandedImmigrant] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.PUBLIC_URL}/config/usefullinks.json`);
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  const handleExpandClickHealth = () => {
    setExpandedHealth(!expandedHealth);
  };

  const handleExpandClickEmployment = () => {
    setExpandedEmployment(!expandedEmployment);
  };

  const handleExpandClickImmigrant = () => {
    setExpandedImmigrant(!expandedImmigrant);
  };

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container sx={{ marginTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ marginBottom: 4, color: '#ff6341' }}>
        Useful Links for Newcomers to New Brunswick
      </Typography>
      <Grid container spacing={4}>
        
        {/* Health Services Section */}
        <Grid item xs={12}>
          <Zoom triggerOnce={false}>
            <Card
              sx={{
                backgroundColor: '#0c1a2c',
                color: '#fff',
                minHeight: '250px',
                display: 'flex',
                flexDirection: 'column',
                padding: 3,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                borderRadius: '15px',
                '&:hover': {
                  backgroundColor: '#112240',
                  transform: 'translateY(-10px)',
                  transition: '0.3s ease-in-out',
                },
              }}
            >
              <CardActionArea onClick={handleExpandClickHealth}>
                <IconButton
                  sx={{
                    backgroundColor: '#ff6341',
                    color: '#fff',
                    width: '64px',
                    height: '64px',
                    marginBottom: 2,
                    '&:hover': {
                      backgroundColor: '#ff8261',
                    },
                  }}
                >
                  <LocalHospital />
                </IconButton>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: '#ff6341',
                    }}
                  >
                    Health Services
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 2, color: '#fff' }}>
                    Click to explore health-related services in New Brunswick.
                  </Typography>
                  <IconButton
                    sx={{
                      color: '#ff6341',
                      transform: expandedHealth ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease-in-out',
                      alignSelf: 'flex-end',
                    }}
                  >
                    <ExpandMore />
                  </IconButton>
                </CardContent>
              </CardActionArea>
              <Collapse in={expandedHealth} timeout="auto" unmountOnExit>
                <CardContent>
                  <List>
                    {data.healthLinks.map((link, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={`${index + 1}. ${link.title}`}
                          secondary={link.description}
                          primaryTypographyProps={{ style: { color: '#ff6341' } }}
                          secondaryTypographyProps={{ style: { color: '#fff' } }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Collapse>
            </Card>
          </Zoom>
        </Grid>

        {/* Employment Services Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Zoom triggerOnce={false}>
            <Card
              sx={{
                backgroundColor: '#0c1a2c',
                color: '#fff',
                minHeight: '250px',
                display: 'flex',
                flexDirection: 'column',
                padding: 3,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                borderRadius: '15px',
                '&:hover': {
                  backgroundColor: '#112240',
                  transform: 'translateY(-10px)',
                  transition: '0.3s ease-in-out',
                },
              }}
            >
              <CardActionArea onClick={handleExpandClickEmployment}>
                <IconButton
                  sx={{
                    backgroundColor: '#ff6341',
                    color: '#fff',
                    width: '64px',
                    height: '64px',
                    marginBottom: 2,
                    '&:hover': {
                      backgroundColor: '#ff8261',
                    },
                  }}
                >
                  <Work />
                </IconButton>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: '#ff6341',
                    }}
                  >
                    Employment Services
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 2, color: '#fff' }}>
                    Explore job opportunities.
                  </Typography>
                  <IconButton
                    sx={{
                      color: '#ff6341',
                      transform: expandedEmployment ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease-in-out',
                      alignSelf: 'flex-end',
                    }}
                  >
                    <ExpandMore />
                  </IconButton>
                </CardContent>
              </CardActionArea>
              <Collapse in={expandedEmployment} timeout="auto" unmountOnExit>
                <CardContent>
                  <List>
                    {data.employmentLinks.map((jobLink, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={`${index + 1}. ${jobLink.title}`}
                          secondary={jobLink.description}
                          primaryTypographyProps={{ style: { color: '#ff6341' } }}
                          secondaryTypographyProps={{ style: { color: '#fff' } }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Collapse>
            </Card>
          </Zoom>
        </Grid>

        {/* For New Immigrants Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Zoom triggerOnce={false}>
            <Card
              sx={{
                backgroundColor: '#0c1a2c',
                color: '#fff',
                minHeight: '250px',
                display: 'flex',
                flexDirection: 'column',
                padding: 3,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                borderRadius: '15px',
                '&:hover': {
                  backgroundColor: '#112240',
                  transform: 'translateY(-10px)',
                  transition: '0.3s ease-in-out',
                },
              }}
            >
              <CardActionArea onClick={handleExpandClickImmigrant}>
                <IconButton
                  sx={{
                    backgroundColor: '#ff6341',
                    color: '#fff',
                    width: '64px',
                    height: '64px',
                    marginBottom: 2,
                    '&:hover': {
                      backgroundColor: '#ff8261',
                    },
                  }}
                >
                  <Groups />
                </IconButton>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: '#ff6341',
                    }}
                  >
                    For New Immigrants
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 2, color: '#fff' }}>
                    Information and services for newcomers to New Brunswick.
                  </Typography>
                  <IconButton
                    sx={{
                      color: '#ff6341',
                      transform: expandedImmigrant ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease-in-out',
                      alignSelf: 'flex-end',
                    }}
                  >
                    <ExpandMore />
                  </IconButton>
                </CardContent>
              </CardActionArea>
              <Collapse in={expandedImmigrant} timeout="auto" unmountOnExit>
                <CardContent>
                  <List>
                    {data.immigrantLinks.map((link, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={`${index + 1}. ${link.title}`}
                          secondary={link.description}
                          primaryTypographyProps={{ style: { color: '#ff6341' } }}
                          secondaryTypographyProps={{ style: { color: '#fff' } }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Collapse>
            </Card>
          </Zoom>
        </Grid>

        {/* General Links */}
        {data.links.map((link, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Zoom triggerOnce={false}>
              <Card
                sx={{
                  backgroundColor: '#0c1a2c',
                  color: '#fff',
                  minHeight: '250px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: 3,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                  borderRadius: '15px',
                  '&:hover': {
                    backgroundColor: '#112240',
                    transform: 'translateY(-10px)',
                    transition: '0.3s ease-in-out',
                  },
                }}
              >
                <CardActionArea href={link.link} target="_blank" rel="noopener noreferrer">
                  <IconButton
                    sx={{
                      backgroundColor: '#ff6341',
                      color: '#fff',
                      width: '64px',
                      height: '64px',
                      marginBottom: 2,
                      '&:hover': {
                        backgroundColor: '#ff8261',
                      },
                    }}
                  >
                    {iconMapping[link.icon]}
                  </IconButton>
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        color: '#ff6341',
                      }}
                    >
                      {link.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                      {link.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Zoom>
          </Grid>
        ))}

      </Grid>
    </Container>
  );
};

export default UsefulLinks;
