import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Facebook, Instagram, WhatsApp, Email } from '@mui/icons-material';
import './ContactUs.css';
import Breadcrumbs from '../Breadcrumbs';
import HelmetWrapper from '../HelmetWrapper';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
    <div className="contact-us-page">
      <HelmetWrapper 
        pageTitle="Contact Us - Fredericton Association of Malayalees" 
        description="Get in touch with the Fredericton Association of Malayalees." 
      />

      <div className="hero-banner">
        <Container>
          <Grid container justifyContent="center" alignItems="center" direction="column">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you! Feel free to reach out.</p>
          </Grid>
        </Container>
      </div>

      <Container>
        <Breadcrumbs />
        <div className="contact-us-container">
        <Grid container spacing={4} justifyContent="center" alignItems="center">

            <Grid item xs={12} md={6} className="left-col">
              <img src={logofam} alt="Logo" className="logo-image" />
              <div className="social-links">
                <a href="https://www.facebook.com/share/3BRkpFoRkYSc1fVm/?mibextid=WUal2a"target="_blank" rel="noopener noreferrer" className="social-icon">
                  <Facebook fontSize="large" />
                </a>
                <a href="https://www.instagram.com/famnbca?igsh=MndpM3lzMWlmaHJq" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <Instagram fontSize="large" />
                </a>
                <a href="https://chat.whatsapp.com/IS3UUoZ1cqW9p6NLRg5QZB" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <WhatsApp fontSize="large" />
                </a>
                <a href="mailto:info@famnb.ca" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <Email fontSize="large" />
                </a>
              </div>
            </Grid>
            <Grid item xs={12} md={6} className="right-col " >
              <h2 className="contactushead">Get In Touch</h2>
              <div className="contact-info">
                <p>If you have any questions, comments, or concerns, please don't hesitate to contact us using the form below.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <TextField 
                  label="Name" 
                  variant="outlined" 
                  fullWidth 
                  margin="normal" 
                  required 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="contact-field"
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
                  className="contact-field"
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
                  className="contact-field"
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  className="submit-button"
                >
                  Send Message
                </Button>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                  <Alert onClose={handleCloseSnackbar} severity={alertSeverity}>
                    {responseMessage}
                  </Alert>
                </Snackbar>
              </form>
            </Grid>
          </Grid>
        </div>
      </Container>
      
      <div className="map-container">
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
      </div>
    </div>
  );
};

export default ContactUs;
