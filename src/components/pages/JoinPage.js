import React, { useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Dialog, Container } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Breadcrumbs from '../Breadcrumbs';
import JoinPageModal from '../JoinPageModal';

const JoinPage = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: 900,
          p: { xs: 2, md: 4 },
          borderRadius: 4,
          backgroundColor: 'background.paper',
          boxShadow: 6,
          textAlign: 'center',
          background: 'linear-gradient(145deg, #f0f0f0, #ffffff)', // More modern styling
        }}
      >
        <Breadcrumbs />

        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#ff6341',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          }}
        >
          Fredericton Association of Malayalees
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{
            mb: 3,
            fontSize: { xs: '1rem', sm: '1.2rem' },
            lineHeight: 1.7,
          }}
        >
          Welcome to the Fredericton Association of Malayalees (FAM)! We are a vibrant community of Malayalees residing
          in Fredericton, dedicated to promoting our rich culture, heritage, and values.
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{
            mb: 3,
            fontSize: { xs: '1rem', sm: '1.2rem' },
            lineHeight: 1.7,
          }}
        >
          By becoming a member, you can enjoy numerous benefits including:
        </Typography>

        <List sx={{ mb: 3 }}>
          {['Participate in cultural events and festivals', 'Network with other members of the community',
            'Access to community support and resources', 'Opportunities for volunteering and community service'].map((benefit, index) => (
            <ListItem key={index} sx={{ justifyContent: 'center' }}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: '#ff6341' }} />
              </ListItemIcon>
              <ListItemText
                primary={benefit}
                primaryTypographyProps={{
                  variant: 'h6',
                  sx: { fontSize: { xs: '1rem', sm: '1.2rem' } },
                }}
              />
            </ListItem>
          ))}
        </List>

        <Typography
          variant="body1"
          paragraph
          sx={{
            mb: 4,
            fontSize: { xs: '1rem', sm: '1.2rem' },
          }}
        >
          Join us today and be a part of our growing family!
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: '#ff6341',
            borderRadius: '50px',
            padding: { xs: '10px 20px', sm: '5px 20px' },
            fontSize: { xs: '1rem', sm: '1.2rem' },
            boxShadow: 4,
            '&:hover': {
              backgroundColor: '#e65100',
              boxShadow: 6,
            },
          }}
          onClick={handleClickOpen}
        >
          Join Now
        </Button>
      </Box>

      {/* Updated Modal using Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <JoinPageModal handleClose={handleClose} />
      </Dialog>
    </Container>
  );
};

export default JoinPage;
