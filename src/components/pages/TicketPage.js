import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import ModalComponent from '../ModalComponent'; // Import the ModalComponent

const TicketPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const iframeLink = "https://www.zeffy.com/en-CA/ticketing/ec366437-165a-483a-9964-6a1150fd8fb6"; // Replace this with your actual iframe link
  const gameImage = `${process.env.PUBLIC_URL}/images/events/game.jpeg`;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: { xs: 3, md: 5 },
        marginTop:"50px" // Add padding for smaller screens
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: '100%', // Ensure the card takes full width on smaller screens
          borderRadius: 2,
          position: 'relative',
        }}
      >
        <Box
          component="img"
          src={gameImage}
          alt="Event Promo"
          sx={{
            width: '100%',
            height: '100%', // Responsive heights for different screens
            objectFit: 'cover', // Ensures the image covers the box without cutting off important parts
            borderRadius: '8px 8px 0 0',
          }}
        />
        <CardContent sx={{ textAlign: 'center', padding: 2 }}>
          <Typography variant="h5" component="h2" color="textPrimary">
            Buy Your Ticket Now!
          </Typography>
          <Button
            sx={{
              marginTop: 2,
              padding: '10px 24px',
              fontSize: '18px',
              fontWeight: 'bold',
              backgroundColor: '#ff6341',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#e55334',
              },
            }}
            variant="contained"
            onClick={handleOpenModal} // Open modal on button click
          >
            Buy Ticket
          </Button>
        </CardContent>
      </Card>

      {/* ModalComponent to display iframe */}
      <ModalComponent
        open={modalOpen}
        handleClose={handleCloseModal}
        iframeSrc={iframeLink} // Pass the iframe link as prop
      />
    </Box>
  );
};

export default TicketPage;
