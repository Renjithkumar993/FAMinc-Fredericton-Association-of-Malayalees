import React, { useState } from 'react';
import { Container, Grid, Box, Typography, TextField, Button, Snackbar, Alert, IconButton, Tooltip } from '@mui/material';
import { Facebook, Instagram, WhatsApp, Email } from '@mui/icons-material';
import Breadcrumbs from '../Breadcrumbs';
import HelmetWrapper from '../HelmetWrapper';

const ContactUs = () => {
  const logofam = `${process.env.PUBLIC_URL}/images/logofam.jpg`;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://famnb.ca/send-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData),
      });

      const result = await response.json();

      if (result.success) {
        setAlertSeverity('success');
        setResponseMessage('Message has been sent. We will get back to you as soon as possible.');
      } else {
        setAlertSeverity('error');
        setResponseMessage('There was an error sending the message. Please try again later.');
      }
      
      setOpenSnackbar(true);
    } catch (error) {
      setAlertSeverity('error');
      setResponseMessage('There was an error sending the message. Please try again later.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <HelmetWrapper 
        pageTitle="Contact Us - Fredericton Association of Malayalees" 
        description="Get in touch with the Fredericton Association of Malayalees." 
      />

      <Box sx={{ background: 'linear-gradient(135deg, #ff6341, #ff7e5f)', color: 'white', p: 5, textAlign: 'center', mb: 4 ,mt: 10 }}>
        <Typography variant="h2" fontWeight="bold" gutterBottom>Contact Us</Typography>
        <Typography variant="subtitle1">We'd love to hear from you! Feel free to reach out.</Typography>
      </Box>

      <Container maxWidth="lg">
        <Breadcrumbs />

        <Grid container spacing={6} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={5}>
            <Box textAlign="center" mb={3}>
              <Box component="img" src={logofam} alt="Logo" sx={{ width: 150}} />
            </Box>
            <Box display="flex" justifyContent="center" gap={2} mt={2}>
              <Tooltip title="Facebook">
                <IconButton component="a" href="https://www.facebook.com/share/3BRkpFoRkYSc1fVm/?mibextid=WUal2a" target="_blank" rel="noopener noreferrer" sx={{ color: '#4267B2', '&:hover': { color: '#3b5998' } }}>
                  <Facebook fontSize="large" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Instagram">
                <IconButton component="a" href="https://www.instagram.com/famnbca?igsh=MndpM3lzMWlmaHJq" target="_blank" rel="noopener noreferrer" sx={{ color: '#E4405F', '&:hover': { color: '#d6249f' } }}>
                  <Instagram fontSize="large" />
                </IconButton>
              </Tooltip>
              <Tooltip title="WhatsApp">
                <IconButton component="a" href="https://chat.whatsapp.com/IS3UUoZ1cqW9p6NLRg5QZB" target="_blank" rel="noopener noreferrer" sx={{ color: '#25D366', '&:hover': { color: '#128C7E' } }}>
                  <WhatsApp fontSize="large" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Email">
                <IconButton component="a" href="mailto:info@famnb.ca" target="_blank" rel="noopener noreferrer" sx={{ color: '#EA4335', '&:hover': { color: '#D93025' } }}>
                  <Email fontSize="large" />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Typography variant="h4" gutterBottom fontWeight="bold">Get In Touch</Typography>
            <Typography variant="body1" gutterBottom>If you have any questions, comments, or concerns, please don't hesitate to contact us using the form below.</Typography>
            
            <form onSubmit={handleSubmit}>
              <TextField 
                label="Name" 
                variant="outlined" 
                fullWidth 
                margin="normal" 
                required 
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <TextField 
                label="Email" 
                type="email" 
                variant="outlined" 
                fullWidth 
                margin="normal" 
                required 
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField 
                label="Message" 
                variant="outlined" 
                multiline 
                rows={4} 
                fullWidth 
                margin="normal" 
                required 
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
              <Button 
                type="submit" 
                variant="contained" 
                sx={{ mt: 2, py: 1.5, fontWeight: 'bold', backgroundColor: '#ff6341', '&:hover': { backgroundColor: '#e84e2b' } }}
                fullWidth
              >
                Send Message
              </Button>
              <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
                  {responseMessage}
                </Alert>
              </Snackbar>
            </form>
          </Grid>
        </Grid>
      </Container>

      <Box mt={5} sx={{ borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17914.883066472462!2d-66.65849926606492!3d45.96358997910885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ca43ae1f0f3b7a5%3A0x32a4958fdbb5a905!2sFredericton%2C%20NB!5e0!3m2!1sen!2sca!4v1605295357034!5m2!1sen!2sca"
          width="100%"
          height="450"
          allowFullScreen=""
          tabIndex="0"
          frameBorder="0"
          style={{ border: 0 }}
          title="Fredericton Association of Malayalees Location Map"
        ></iframe>
      </Box>
    </>
  );
};

export default ContactUs;
