import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box, TextField, Tabs, Tab, Button, InputAdornment } from '@mui/material';
import { LocalHospital, Work, Groups, Link as LinkIcon, Search, Launch, LocationCity, AccountBalance, ChildCare, CreditCard, Apartment } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import HelmetWrapper from './HelmetWrapper';

const iconMapping = {
  LocationCity: <LocationCity fontSize="medium" />,
  Work: <Work fontSize="medium" />,
  AccountBalance: <AccountBalance fontSize="medium" />,
  LocalHospital: <LocalHospital fontSize="medium" />,
  ChildCare: <ChildCare fontSize="medium" />,
  Groups: <Groups fontSize="medium" />,
  CreditCard: <CreditCard fontSize="medium" />,
  Apartment: <Apartment fontSize="medium" />
};

const UsefulLinks = () => {
  const [data, setData] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/config/usefullinks.json`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error loading useful links data:', err);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSearchQuery('');
  };

  if (!data) {
    return (
      <Container sx={{ py: 12, textAlign: 'center', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" color="text.secondary">Loading resources...</Typography>
      </Container>
    );
  }

  // Determine active dataset based on tab
  let activeLinks = [];
  if (tabValue === 0) activeLinks = data.healthLinks || [];
  else if (tabValue === 1) activeLinks = data.employmentLinks || [];
  else if (tabValue === 2) activeLinks = data.immigrantLinks || [];
  else activeLinks = data.links || [];

  // Filter links dynamically with robust fallback values to prevent crashes
  const filteredLinks = activeLinks.filter(item => {
    const title = item.title || '';
    const description = item.description || '';
    const query = searchQuery.toLowerCase();
    
    return title.toLowerCase().includes(query) || description.toLowerCase().includes(query);
  });

  return (
    <>
      <HelmetWrapper 
        pageTitle="Useful Links - Fredericton Association of Malayalees" 
        description="Find essential resources and links for newcomers to Fredericton, New Brunswick, including health, housing, tax, and job search services."
      />
      
      <Container 
        sx={{ 
          py: { xs: 12, md: 15 }, 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-start' 
        }}
      >
        {/* Title */}
        <Typography 
          variant="h3" 
          align="center" 
          sx={{ 
            marginBottom: 2, 
            fontWeight: 900,
            letterSpacing: '-0.02em',
            fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.6rem' }
          }}
        >
          Useful Links <Box component="span" sx={{ color: '#e64a19' }}>for Newcomers</Box>
        </Typography>

        <Typography 
          variant="body1" 
          align="center" 
          color="text.secondary" 
          sx={{ 
            mb: 6, 
            maxWidth: 600, 
            mx: 'auto', 
            fontSize: '1.05rem',
            lineHeight: 1.6
          }}
        >
          Find hand-picked regional directories, government programs, healthcare support, and employment resources to ease your transition to Fredericton.
        </Typography>

        <Grid container spacing={4}>
          {/* Left Column: Responsive Tabs Navigation */}
          <Grid item xs={12} md={3.2}>
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                borderRadius: 4,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.03)',
                p: 2,
                position: { md: 'sticky' },
                top: { md: 100 },
                zIndex: 10
              }}
            >
              {/* Vertical Tabs for Desktop viewports */}
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                orientation="vertical"
                sx={{
                  borderRight: 0,
                  display: { xs: 'none', md: 'flex' },
                  '& .MuiTabs-indicator': {
                    left: 0,
                    width: '4px',
                    borderRadius: '0 4px 4px 0',
                    backgroundColor: '#e64a19',
                  },
                  '& .MuiTab-root': {
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    py: 1.75,
                    px: 2.5,
                    borderRadius: 2.5,
                    color: 'text.secondary',
                    fontWeight: 700,
                    fontSize: '0.925rem',
                    textTransform: 'none',
                    minHeight: 'auto',
                    mb: 1,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      color: '#e64a19',
                      backgroundColor: 'rgba(230, 74, 25, 0.04)',
                    },
                    '&.Mui-selected': {
                      color: '#e64a19',
                      backgroundColor: 'rgba(230, 74, 25, 0.06)',
                    }
                  }
                }}
              >
                <Tab label="Health Services" icon={<LocalHospital sx={{ mr: 1.5, fontSize: '1.3rem' }} />} iconPosition="start" />
                <Tab label="Employment Services" icon={<Work sx={{ mr: 1.5, fontSize: '1.3rem' }} />} iconPosition="start" />
                <Tab label="New Immigrants" icon={<Groups sx={{ mr: 1.5, fontSize: '1.3rem' }} />} iconPosition="start" />
                <Tab label="General Directory" icon={<LinkIcon sx={{ mr: 1.5, fontSize: '1.3rem' }} />} iconPosition="start" />
              </Tabs>

              {/* Horizontal Scrollable Tabs for Mobile Viewports */}
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                orientation="horizontal"
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#e64a19',
                    height: '3px',
                    borderRadius: '2px',
                  },
                  '& .MuiTab-root': {
                    py: 1.25,
                    px: 2,
                    color: 'text.secondary',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textTransform: 'none',
                    minWidth: 'auto',
                    mr: 1,
                    '&.Mui-selected': {
                      color: '#e64a19',
                    }
                  }
                }}
              >
                <Tab label="Health" icon={<LocalHospital sx={{ mr: 0.5, fontSize: '1.1rem' }} />} iconPosition="start" />
                <Tab label="Employment" icon={<Work sx={{ mr: 0.5, fontSize: '1.1rem' }} />} iconPosition="start" />
                <Tab label="Immigrants" icon={<Groups sx={{ mr: 0.5, fontSize: '1.1rem' }} />} iconPosition="start" />
                <Tab label="General" icon={<LinkIcon sx={{ mr: 0.5, fontSize: '1.1rem' }} />} iconPosition="start" />
              </Tabs>
            </Box>
          </Grid>

          {/* Right Column: Search bar and resource list */}
          <Grid item xs={12} md={8.8}>
            {/* Search Input Bar */}
            <Box sx={{ mb: 4 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search resources by keyword (e.g. jobs, medicare, tax)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#ffffff',
                    borderRadius: '50px',
                    px: 3,
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.01)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'rgba(230, 74, 25, 0.2)',
                    },
                    '&.Mui-focused': {
                      borderColor: '#e64a19',
                      boxShadow: '0 8px 30px rgba(230, 74, 25, 0.08)',
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ color: 'text.secondary', mr: 1 }}>
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* List of Resource Cards */}
            <Box component={motion.div} layout sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <AnimatePresence mode="popLayout">
                {filteredLinks.length > 0 ? (
                  filteredLinks.map((item, index) => {
                    // Decide what icon to render
                    let activeIcon = <LinkIcon fontSize="medium" />;
                    if (tabValue === 0) activeIcon = <LocalHospital fontSize="medium" />;
                    else if (tabValue === 1) activeIcon = <Work fontSize="medium" />;
                    else if (tabValue === 2) activeIcon = <Groups fontSize="medium" />;
                    else if (tabValue === 3 && item.icon) activeIcon = iconMapping[item.icon] || <LinkIcon fontSize="medium" />;

                    return (
                      <Box
                        key={`${tabValue}-${item.title}-${index}`}
                        component={motion.div}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3), ease: 'easeOut' }}
                      >
                        <Card
                          sx={{
                            backgroundColor: '#ffffff',
                            border: '1px solid rgba(0, 0, 0, 0.05)',
                            borderRadius: 4,
                            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.01)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              left: 0,
                              top: 0,
                              bottom: 0,
                              width: '0px',
                              backgroundColor: '#e64a19',
                              transition: 'width 0.25s ease',
                            },
                            '&:hover': {
                              transform: 'translateY(-3px)',
                              boxShadow: '0 16px 35px rgba(230, 74, 25, 0.06)',
                              borderColor: 'rgba(230, 74, 25, 0.2)',
                              '&::before': {
                                width: '6px',
                              },
                              '& .link-icon-box': {
                                backgroundColor: 'rgba(230, 74, 25, 0.1)',
                                transform: 'scale(1.08)',
                              },
                              '& .visit-btn': {
                                backgroundColor: '#e64a19',
                                color: '#ffffff',
                                boxShadow: '0 4px 14px rgba(230, 74, 25, 0.3)'
                              }
                            }
                          }}
                        >
                          <CardContent sx={{ p: { xs: 2.5, sm: 3 }, '&:last-child': { pb: { xs: 2.5, sm: 3 } } }}>
                            <Grid container alignItems="center" spacing={2.5}>
                              {/* Icon Container */}
                              <Grid item xs={12} sm={1.5} md={1.2} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'center' } }}>
                                <Box
                                  className="link-icon-box"
                                  sx={{
                                    color: '#e64a19',
                                    backgroundColor: 'rgba(230, 74, 25, 0.05)',
                                    p: 1.75,
                                    borderRadius: 3.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                  }}
                                >
                                  {activeIcon}
                                </Box>
                              </Grid>

                              {/* Details Text */}
                              <Grid item xs={12} sm={8} md={8.8}>
                                <Box sx={{ textAlign: 'left', pl: { sm: 1 } }}>
                                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.75, fontSize: '1.15rem', color: 'text.primary', letterSpacing: '-0.01em' }}>
                                    {item.title}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
                                    {item.description}
                                  </Typography>
                                </Box>
                              </Grid>

                              {/* Action Button */}
                              <Grid item xs={12} sm={2.5} md={2} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="visit-btn"
                                  endIcon={<Launch fontSize="small" />}
                                  sx={{
                                    borderRadius: '30px',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    fontSize: '0.85rem',
                                    px: 3.5,
                                    py: 1,
                                    borderWidth: '1.5px',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                      borderWidth: '1.5px',
                                    }
                                  }}
                                >
                                  Visit
                                </Button>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Box>
                    );
                  })
                ) : (
                  <Box
                    component={motion.div}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Card sx={{ p: 6, textAlign: 'center', backgroundColor: '#ffffff', borderRadius: 4, border: '1px solid rgba(0,0,0,0.05)' }}>
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                        No resources found matching "{searchQuery}"
                      </Typography>
                      <Button variant="outlined" color="primary" sx={{ borderRadius: '30px' }} onClick={() => setSearchQuery('')}>
                        Clear Search
                      </Button>
                    </Card>
                  </Box>
                )}
              </AnimatePresence>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UsefulLinks;
