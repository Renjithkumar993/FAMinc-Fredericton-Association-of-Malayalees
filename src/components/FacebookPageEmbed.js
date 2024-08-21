import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Box, Typography, CircularProgress, Button, Container, IconButton, Grid } from '@mui/material';
import { FaFacebookF } from 'react-icons/fa';

const bgImage = `${process.env.PUBLIC_URL}/images/web_bg.png`;

const FacebookPageEmbed = () => {
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const iframeRef = useRef(null);

  const loadFacebookSDK = useCallback(() => {
    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v20.0';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.FB) {
          window.FB.XFBML.parse();
          setLoading(false);
        } else if (retryCount < maxRetries) {
          setRetryCount(prev => prev + 1);
        }
      };
      script.onerror = () => {
        if (retryCount < maxRetries) {
          setRetryCount(prev => prev + 1);
        }
      };
      document.body.appendChild(script);
    } else if (window.FB) {
      window.FB.XFBML.parse();
      setLoading(false);
    }
  }, [retryCount, maxRetries]);

  useEffect(() => {
    if (retryCount < maxRetries) {
      loadFacebookSDK();
    } else {
      setLoading(false);
    }
  }, [loadFacebookSDK, retryCount, maxRetries]);

  useEffect(() => {
    return () => {
      const script = document.getElementById('facebook-jssdk');
      if (script) {
        script.remove();
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && retryCount < maxRetries) {
            loadFacebookSDK();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => {
      if (iframeRef.current) {
        observer.unobserve(iframeRef.current);
      }
    };
  }, [loadFacebookSDK, retryCount, maxRetries]);

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: 'auto',
        
      }}
    >
      <Grid container spacing={4} alignItems="center" justifyContent="center" marginTop="50px">
        <Grid item xs={12} md={10}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              color: 'white',
              background: 'linear-gradient(135deg, #4267b2, #365899)',
              padding: '2rem',
              borderRadius: '16px 16px 0 0',
              boxShadow: 2,
            }}
          >
            <IconButton
              sx={{
                backgroundColor: 'white',
                color: '#4267b2',
                borderRadius: '50%',
                width: 70,
                height: 70,
                marginBottom: 2,
                boxShadow: 4,
                transition: 'background-color 0.3s ease, color 0.3s ease',
                '&:hover': {
                  backgroundColor: '#365899',
                  color: 'white',
                },
              }}
            >
              <FaFacebookF size={35} />
            </IconButton>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', marginBottom: 1, fontSize: { xs: '2rem', md: '3rem' }, }} >
              Follow Us on <span style={{ color: '#ff6341' }}>Facebook</span>
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8 }}>
              Stay updated with our latest news and events
            </Typography>
          </Box>
          <Box
            ref={iframeRef}
            sx={{
              width: '100%',
              height: '500px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: '#f0f0f0',
              borderRadius: '0 0 16px 16px',
              boxShadow: 2,
              overflow: 'hidden',
            }}
          >
            {loading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  fontSize: '1.5rem',
                  color: '#4267b2',
                }}
              >
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <div
                className="fb-page"
                data-href="https://www.facebook.com/profile.php?id=61552104893247"
                data-tabs="timeline"
                data-width="500"
                data-height="500"
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
                style={{ width: '100%', height: '100%', overflow: 'hidden' }}
              >
                <blockquote
                  cite="https://www.facebook.com/profile.php?id=61552104893247"
                  className="fb-xfbml-parse-ignore"
                >
                  <a href="https://www.facebook.com/profile.php?id=61552104893247">
                    Fredericton Association of Malayalees - FAM
                  </a>
                </blockquote>
              </div>
            )}
            {retryCount >= maxRetries && (
              <Button
                variant="contained"
                href="https://www.facebook.com/profile.php?id=61552104893247"
                target="_blank"
                sx={{
                  marginTop: 2,
                  backgroundColor: '#4267b2',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#365899',
                    transform: 'translateY(-5px)',
                  },
                  transition: 'background-color 0.3s ease, transform 0.3s ease',
                }}
              >
                Visit our Facebook Page
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FacebookPageEmbed;
