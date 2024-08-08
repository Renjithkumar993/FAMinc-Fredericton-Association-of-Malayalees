import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Box, Typography, CircularProgress, Button, Container, IconButton, Grid } from '@mui/material';
import { FaFacebookF } from 'react-icons/fa';

const bgImage = `${process.env.PUBLIC_URL}/images/web_bg.png`;
const chenda = `${process.env.PUBLIC_URL}/images/events/chenda1.gif`;

const FacebookPageEmbed = () => {
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3; // Max retries for loading the SDK
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
          setRetryCount((prevCount) => prevCount + 1);
        }
      };
      script.onerror = () => {
        if (retryCount < maxRetries) {
          setRetryCount((prevCount) => prevCount + 1);
        }
      };
      document.body.appendChild(script);
    } else if (window.FB) {
      window.FB.XFBML.parse();
      setLoading(false);
    } else if (retryCount < maxRetries) {
      setRetryCount((prevCount) => prevCount + 1);
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
      (entries) => {
        entries.forEach((entry) => {
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
        minHeight: '100vh',
        background: `url(${bgImage}) repeat`,
        animation: 'fadeIn 0.6s ease-out',
        p: 2,
        overflow: 'hidden',
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              color: 'white',
              background: 'linear-gradient(135deg, #4267b2, #365899)',
              p: 4,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
          >
            <IconButton
              sx={{
                backgroundColor: 'white',
                color: '#4267b2',
                borderRadius: '50%',
                width: 60,
                height: 60,
                mb: 2,
                boxShadow: 3,
                '&:hover': {
                  backgroundColor: '#365899',
                  color: 'white',
                },
              }}
            >
              <FaFacebookF size={30} />
            </IconButton>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Follow Us on Facebook
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, mb: 2 }}>
              Stay updated with our latest news
            </Typography>
          </Box>
          <Box
            ref={iframeRef}
            sx={{
              width: '100%',
              p: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: 'inherit',
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
          >
            {loading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 200,
                  fontSize: '1.5rem',
                  color: '#4267b2',
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <div
                className="fb-page"
                data-href="https://www.facebook.com/profile.php?id=61552104893247"
                data-tabs="timeline"
                data-width=""
                data-height=""
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
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
                  mt: 2,
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
        <Grid item xs={6} md={3}>
          <Box
            component="img"
            src={chenda}
            alt="Chenda"
            sx={{
              width: '100%',
              height: 'auto',
              maxWidth: 400,
              mx: 'auto',
              animation: 'fadeIn 0.6s ease-out',
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FacebookPageEmbed;
