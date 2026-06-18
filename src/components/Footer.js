import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Facebook, Twitter, YouTube } from '@mui/icons-material';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#12161a', 
        color: '#ffffff', 
        pt: 8, 
        pb: 4, 
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Column 1: About Us */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 3, 
                  color: '#ffffff',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '40px',
                    height: '2px',
                    bottom: '-8px',
                    left: 0,
                    backgroundColor: '#e64a19',
                  }
                }}
              >
                About Us
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255,255,255,0.7)', 
                  lineHeight: 1.8,
                  mt: 1
                }}
              >
                Fredericton Association Of Malayalees is a non-profit,
                non-political, non-religious association for promoting the
                cultural and social activities of Malayalees in Fredericton.
              </Typography>
            </Box>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 3, 
                  color: '#ffffff',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '40px',
                    height: '2px',
                    bottom: '-8px',
                    left: 0,
                    backgroundColor: '#e64a19',
                  }
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
                <Link
                  component="button"
                  onClick={() => handleNavigate('/joinus')}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#e64a19',
                      textDecoration: 'none',
                    }
                  }}
                >
                  Register
                </Link>
                <Link
                  component="button"
                  onClick={() => handleNavigate('/aboutus')}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#e64a19',
                      textDecoration: 'none',
                    }
                  }}
                >
                  About Us
                </Link>
                <Link
                  component="button"
                  onClick={() => handleNavigate('/events')}
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#e64a19',
                      textDecoration: 'none',
                    }
                  }}
                >
                  Buy Tickets / Events
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Column 3: Contact Us */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 3, 
                  color: '#ffffff',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '40px',
                    height: '2px',
                    bottom: '-8px',
                    left: 0,
                    backgroundColor: '#e64a19',
                  }
                }}
              >
                Contact Us
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1.5 }}>
                  Email:{' '}
                  <Link 
                    href="mailto:info@famnb.ca" 
                    sx={{ 
                      color: '#e64a19', 
                      textDecoration: 'none',
                      fontWeight: 600,
                      '&:hover': { textDecoration: 'underline' } 
                    }}
                  >
                    info@famnb.ca
                  </Link>
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                  Address: Fredericton, New Brunswick, Canada
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5, borderColor: 'rgba(255,255,255,0.08)' }} />

        {/* Footer Bottom */}
        <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
          <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              © {currentYear} Fredericton Association Of Malayalees. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, gap: 1 }}>
              <IconButton 
                component="a" 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                sx={{ 
                  color: 'rgba(255,255,255,0.6)', 
                  '&:hover': { color: '#e64a19', backgroundColor: 'rgba(255,255,255,0.05)' } 
                }}
                aria-label="Facebook"
              >
                <Facebook />
              </IconButton>
              <IconButton 
                component="a" 
                href="https://www.twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                sx={{ 
                  color: 'rgba(255,255,255,0.6)', 
                  '&:hover': { color: '#e64a19', backgroundColor: 'rgba(255,255,255,0.05)' } 
                }}
                aria-label="Twitter"
              >
                <Twitter />
              </IconButton>
              <IconButton 
                component="a" 
                href="https://www.youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                sx={{ 
                  color: 'rgba(255,255,255,0.6)', 
                  '&:hover': { color: '#e64a19', backgroundColor: 'rgba(255,255,255,0.05)' } 
                }}
                aria-label="YouTube"
              >
                <YouTube />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
