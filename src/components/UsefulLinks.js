import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, CardActionArea, Box, IconButton, Collapse } from '@mui/material';
import { ExpandMore, LocationCity, Work, AccountBalance, LocalHospital, ChildCare, Groups, CreditCard, Apartment } from '@mui/icons-material';
import { Zoom } from 'react-awesome-reveal';

const UsefulLinks = () => {
  const [expandedHealth, setExpandedHealth] = useState(false);
  const [expandedEmployment, setExpandedEmployment] = useState(false);

  const handleExpandClickHealth = () => {
    setExpandedHealth(!expandedHealth);
  };

  const handleExpandClickEmployment = () => {
    setExpandedEmployment(!expandedEmployment);
  };

  const healthLinks = [
    { title: 'NB Medicare', description: 'Apply for your Medicare card.', link: 'https://www2.gnb.ca/content/gnb/en/departments/health/Medicare.html' },
    { title: 'Fredericton Downtown Community Health Center', description: 'Request health services at the Downtown Community Health Center.', link: 'https://nb.skipthewaitingroom.com/walk-in-clinic/fredericton/horizon-clinics/fredericton-downtown-community-health-center-request-for-service' },
    { title: 'EvisitNB with Maple', description: 'Virtual healthcare visits through EvisitNB.', link: 'https://www.getmaple.ca/evisitnb/' },
    { title: 'Walk-in Clinic Locations', description: 'Walk-in clinics provide care for New Brunswick patients with non-urgent medical problems.', link: 'https://www.nbms.nb.ca/walk-in-clinics/' },
  ];

  const employmentLinks = [
    { title: 'Government of Canada Jobs', link: 'https://emploisfp-psjobs.cfp-psc.gc.ca/psrs-srfp/applicant/page2440?fromMenu=true&toggleLanguage=en' },
    { title: 'GC Digital Talent', link: 'https://talent.canada.ca/en/' },
    { title: 'NB Jobs', link: 'https://www.nbjobs.ca/' },
    { title: 'GNB Jobs', link: 'https://www2.gnb.ca/content/gnb/en/gateways/employment.html' },
    { title: 'Indeed Jobs', link: 'https://ca.indeed.com/jobs?q=&l=Fredericton%2C+NB&from=searchOnDesktopSerp&vjk=0f814476e27b78fd' },
    { title: 'Monster Jobs', link: 'https://www.monster.ca/jobs/search?q=&where=fredericton&page=1&so=p.s.sh' },
    { title: 'CareerBeacon', link: 'https://www.careerbeacon.com/en/search/jobs-in-Fredericton_New-Brunswick' },
  ];

  const links = [
    { title: 'New Brunswick Immigration Program Streams', description: 'Learn about the NBPNP process.', icon: <LocationCity />, link: 'https://www2.gnb.ca/content/gnb/en/corporate/promo/immigration/immigrating-to-nb/nb-immigration-program-streams.html' },
    { title: 'Tax Filing', description: 'Personal income tax filing guidelines.', icon: <AccountBalance />, link: 'https://www.canada.ca/en/services/taxes/income-tax/personal-income-tax.html' },
    { title: 'Child Care', description: 'Learn more about ChildCare in Fredericton.', icon: <ChildCare />, link: 'https://www.nbed.nb.ca/parentportal/en/search/elc/#lat=46.52936210750518,long=-66.17836761,zoom=7,opt=di:;a2:0;a25:0;as:0;oa:0;d:0;tc:0;th:0;le:0;lf:0;lb:0;po:0;on:||' },
    { title: 'For New Immigrants', description: 'For newcomers to Canada.', icon: <Groups />, link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants.html' },
    { title: 'Social Insurance Number', description: 'Submit your SIN application.', icon: <CreditCard />, link: 'https://www.canada.ca/en/employment-social-development/services/sin/apply.html' },
    { title: 'Social Development Canada', description: 'Improve the standard of living.', icon: <Apartment />, link: 'https://www.canada.ca/en/employment-social-development.html' },
  ];

  return (
    <Box sx={{ padding: 2, marginTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowX: 'hidden' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ marginBottom: 4, color: '#ff6341' }}>
        Useful Links for Newcomers to New Brunswick
      </Typography>
      <Grid container spacing={4}>
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
                  transform: 'scale(1.05)',
                  transition: '0.3s',
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
                  <Typography variant="body2" sx={{ marginBottom: 2 }}>
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
                  {healthLinks.map((link, index) => (
                    <Typography key={index} variant="body2" sx={{ marginBottom: 1 }}>
                      <a href={link.link} target="_blank" rel="noopener noreferrer" style={{ color: '#ff6341', textDecoration: 'none' }}>
                        {link.title} - {link.description}
                      </a>
                    </Typography>
                  ))}
                </CardContent>
              </Collapse>
            </Card>
          </Zoom>
        </Grid>

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
                  transform: 'scale(1.05)',
                  transition: '0.3s',
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
                  <Typography variant="body2" sx={{ marginBottom: 2 }}>
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
                  {employmentLinks.map((jobLink, index) => (
                    <Typography key={index} variant="body2" sx={{ marginBottom: 1 }}>
                      <a href={jobLink.link} target="_blank" rel="noopener noreferrer" style={{ color: '#ff6341', textDecoration: 'none' }}>
                        {jobLink.title}
                      </a>
                    </Typography>
                  ))}
                </CardContent>
              </Collapse>
            </Card>
          </Zoom>
        </Grid>

        {links.map((link, index) => (
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
                    transform: 'scale(1.05)',
                    transition: '0.3s',
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
                    {link.icon}
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
                    <Typography variant="body2">{link.description}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UsefulLinks;
