import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Box,
  Container,
  Fab,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faCalendarAlt, faEnvelope, faBars, faImages, faUsers, faArrowUp, faLink } from '@fortawesome/free-solid-svg-icons';
import './NavigationBar.css';

const pages = [
  { name: 'Home', icon: faHome, path: '/' },
  { name: 'About Us', icon: faInfoCircle, path: '/aboutus' },
  { name: 'Events', icon: faCalendarAlt, path: '/events' },
  { name: 'Gallery', icon: faImages, path: '/gallery' },
  { name: 'Useful Links', icon: faLink, path: '/usefullinks' },
  { name: 'Contact Us', icon: faEnvelope, path: '/contactus' },
];

const logo = `${process.env.PUBLIC_URL}/images/logofam.avif`;

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
    setShowBackToTop(window.scrollY > 200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setScrolled(window.scrollY > 50);
      window.addEventListener('scroll', handleScroll);
    } else {
      setScrolled(true);
      window.removeEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      scrollToTop();
    }
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          color: scrolled ? '#1a1a1a' : 'white',
          width: { xs: '100%', md: scrolled ? 'calc(100% - 48px)' : '100%' },
          maxWidth: { xs: '100%', md: scrolled ? '1200px' : '100%' },
          left: '50%',
          transform: 'translateX(-50%)',
          top: { xs: 0, md: scrolled ? 16 : 0 },
          borderRadius: { xs: 0, md: scrolled ? '40px' : 0 },
          boxShadow: scrolled ? '0 12px 40px rgba(0, 0, 0, 0.08)' : 'none',
          border: scrolled ? '1px solid rgba(230, 74, 25, 0.1)' : 'none',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: scrolled ? 4 : 2 }, transition: 'padding 0.4s ease' }}>
          <Toolbar disableGutters sx={{ height: scrolled ? 64 : 80, transition: 'height 0.4s ease' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <RouterLink to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }} onClick={handleHomeClick}>
                <Box
                  component="img"
                  src={logo}
                  alt="FAM Logo"
                  className={`logo ${scrolled ? 'logo-scrolled' : ''}`}
                  loading="lazy"
                  sx={{
                    height: scrolled ? 46 : 56,
                    width: scrolled ? 46 : 56,
                    borderRadius: '50%',
                    border: scrolled ? '2px solid rgba(230, 74, 25, 0.2)' : '2px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: scrolled ? '0 4px 12px rgba(0, 0, 0, 0.08)' : 'none',
                    marginRight: 2,
                    transition: 'all 0.4s ease',
                    objectFit: 'cover',
                  }}
                />
                <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ 
                    display: { xs: 'none', md: 'block' },
                    fontWeight: 800,
                    color: scrolled ? '#e64a19' : 'white',
                    letterSpacing: '-0.02em',
                    textShadow: scrolled ? 'none' : '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  FAM
                </Typography>
              </RouterLink>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {pages.slice(0, 6).map((page) => (
                <Button
                  key={page.name}
                  component={RouterLink}
                  to={page.path}
                  color="inherit"
                  sx={{
                    mx: { md: 0.75, lg: 1.5 },
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: scrolled ? '#333333' : 'white',
                    position: 'relative',
                    textShadow: scrolled ? 'none' : '0 1px 2px rgba(0,0,0,0.3)',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: '#e64a19',
                      '&::after': {
                        width: '100%',
                      },
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '0%',
                      height: '3px',
                      bottom: '-5px',
                      left: '0',
                      backgroundColor: '#e64a19',
                      transition: 'width 0.3s ease',
                    },
                  }}
                  onClick={page.path === '/' ? handleHomeClick : undefined}
                >
                  {page.name}
                </Button>
              ))}
              <Button
                component={RouterLink}
                to="/joinus"
                variant="contained"
                color="primary"
                sx={{
                  ml: 2,
                  borderRadius: "25px",
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 14px rgba(230, 74, 25, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(230, 74, 25, 0.4)',
                  },
                }}
                startIcon={<FontAwesomeIcon icon={faUsers} />}
              >
                Join Community
              </Button>
            </Box>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
              sx={{ ml: 2, display: { md: 'none' }, fontSize: '2rem', color: '#e64a19' }}
            >
              <FontAwesomeIcon icon={faBars} />
            </IconButton>
          </Toolbar>
        </Container>
        <Drawer 
          anchor="left" 
          open={menuOpen} 
          onClose={toggleMenu} 
          sx={{ 
            '& .MuiDrawer-paper': { 
              backgroundColor: '#ffffff', 
              color: '#1a1a1a', 
              width: 250,
              boxShadow: '4px 0 24px rgba(0,0,0,0.1)'
            } 
          }}
        >
          <List sx={{ pt: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <img src={logo} alt="FAM Logo" style={{ width: 80, height: 80, borderRadius: '50%', border: '2px solid #e64a19' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1, color: '#e64a19' }}>FAM NB</Typography>
            </Box>
            {pages.map((page) => (
              <ListItem 
                button 
                key={page.name} 
                component={RouterLink} 
                to={page.path} 
                onClick={toggleMenu} 
                sx={{ 
                  py: 1.5,
                  '&:hover': { 
                    backgroundColor: '#e64a19', 
                    color: 'white',
                    '& .MuiListItemIcon-root': { color: 'white' }
                  } 
                }}
              >
                <ListItemIcon sx={{ color: '#e64a19', transition: 'color 0.2s' }}>
                  <FontAwesomeIcon icon={page.icon} />
                </ListItemIcon>
                <ListItemText primary={page.name} primaryTypographyProps={{ fontWeight: 'bold' }} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </AppBar>
      {showBackToTop && (
        <Fab
          color="primary"
          size="medium"
          aria-label="scroll back to top"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
            color: 'white',
            boxShadow: '0 4px 16px rgba(230, 74, 25, 0.4)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </Fab>
      )}
    </>
  );
};

export default NavigationBar;
