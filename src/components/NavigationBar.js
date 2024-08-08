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
import { faHome, faInfoCircle, faCalendarAlt, faEnvelope, faBars, faImages, faUsers, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './NavigationBar.css';

const pages = [
  { name: 'Home', icon: faHome, path: '/' },
  { name: 'About Us', icon: faInfoCircle, path: '/aboutus' },
  { name: 'Events', icon: faCalendarAlt, path: '/events' },
  { name: 'Gallery', icon: faImages, path: '/gallery' },
  { name: 'Contact Us', icon: faEnvelope, path: '/contactus' },
];

const logo = `${process.env.PUBLIC_URL}/images/logofam.avif`;
const bgImage = `${process.env.PUBLIC_URL}/images/web_bg.png`;

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
      <AppBar position="fixed" className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} elevation={0} style={{
        backgroundImage: scrolled ? `url(${bgImage})` : 'none',
      }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <RouterLink to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }} onClick={handleHomeClick}>
                <img src={logo} alt="FAM Logo" className={`logo ${scrolled ? 'logo-scrolled' : ''}`} loading="lazy" />
                <Typography variant="h6" component="div" sx={{ display: { xs: 'none', md: 'block' } }}>
                  
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
                    mx: 1.5,
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    color: scrolled ? 'black' : 'white',
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: '#ff5722',
                      '&::after': {
                        width: '100%',
                      },
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '0%',
                      height: '2px',
                      bottom: '-5px',
                      left: '0',
                      backgroundColor: '#ff5722',
                      transition: 'width 0.3s ease',
                    },
                  }}
                  startIcon={<FontAwesomeIcon icon={page.icon} />}
                  onClick={page.path === '/' ? handleHomeClick : undefined}
                >
                  {page.name}
                </Button>
              ))}
              <Button
                component={RouterLink}
                to="/joinus"
                variant="contained"
                sx={{
                  ml: 2,
                  backgroundColor: '#ff5722',
                  borderRadius: "25px",
                  color: 'white',
                  fontSize: '0.9rem',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#ff5722',
                    transform: 'scale(1.1)',
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
              sx={{ ml: 2, display: { md: 'none' }, fontSize: '2rem', color: '#ff5722' }}
            >
              <FontAwesomeIcon icon={faBars} />
            </IconButton>
          </Toolbar>
        </Container>
        <Drawer anchor="left" open={menuOpen} onClose={toggleMenu} sx={{ '& .MuiDrawer-paper': { backgroundColor: 'white', color: 'black' } }}>
          <List>
            {pages.map((page) => (
              <ListItem button key={page.name} component={RouterLink} to={page.path} onClick={toggleMenu} sx={{ '&:hover': { backgroundColor: '#ff5722', color: 'white' } }}>
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <FontAwesomeIcon icon={page.icon} />
                </ListItemIcon>
                <ListItemText primary={page.name} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </AppBar>
      {showBackToTop && (
        <Fab
          color="secondary"
          size="medium"
          aria-label="scroll back to top"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
            backgroundColor: '#ff5722',
            color: 'white',
            '&:hover': {
              backgroundColor: '#ff5722',
              opacity: 0.8,
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
