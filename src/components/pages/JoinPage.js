import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Breadcrumbs from '../Breadcrumbs';

const iframeSrc =
  'https://www.zeffy.com/ticketing/fredericton-association-of-malayaleesfam-memberships--2025';

const eligibilityPoints = [
  "Committed to furthering the FAM's objectives.",
  'Submit a written application to the BOD in a prescribed format.',
  'Pay the prescribed membership fees.',
  'Be a resident of Fredericton and adjacent areas. Membership is not open to residents of cities or towns which have separate associations with similar objectives.',
  'The BOD has full authority to approve or reject membership applications.',
];

const IframeModal = ({ open, onClose, src }) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullScreen
    PaperProps={{
      sx: {
        bgcolor: 'background.paper',
        position: 'relative',
      },
    }}
  >
    <IconButton
      onClick={onClose}
      sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10, color: 'text.primary' }}
      aria-label="close"
      size="large"
    >
      <CloseIcon />
    </IconButton>

    <Box
      sx={{
        height: '100vh',
        width: '100%',
      }}
    >
      <iframe
        src={src}
        title="Membership Form"
        style={{ width: '100%', height: '100%', border: 'none' }}
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
      />
    </Box>
  </Dialog>
);

export default function JoinPage() {
  const [agreed, setAgreed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (agreed) {
      setModalOpen(true);
    }
  };
  const handleCloseModal = () => setModalOpen(false);

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        py: { xs: 3, md: 6 },
        px: { xs: 2, md: 4 },
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
          textAlign: 'center',
          mb: 3,
        }}
      >
        Fredericton Association of Malayalees
      </Typography>

      <Typography
        variant="body1"
        paragraph
        sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, lineHeight: 1.7, maxWidth: 900, mx: 'auto' }}
      >
        Welcome to the Fredericton Association of Malayalees (FAM)! We are a vibrant community of Malayalees
        residing in Fredericton, dedicated to promoting our rich culture, heritage, and values.
      </Typography>

      <Typography
        variant="body1"
        paragraph
        sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, lineHeight: 1.7, maxWidth: 900, mx: 'auto' }}
      >
        By becoming a member, you can enjoy numerous benefits including:
      </Typography>

      <List
        sx={{
          maxWidth: 900,
          mx: 'auto',
          mb: 4,
          px: 0,
          '& .MuiListItem-root': { justifyContent: 'center' },
        }}
      >
        {[
          'Participate in cultural events and festivals',
          'Network with other members of the community',
          'Access to community support and resources',
          'Opportunities for volunteering and community service',
        ].map((benefit, i) => (
          <ListItem key={i} sx={{ px: 2 }}>
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: '#ff6341' }} />
            </ListItemIcon>
            <ListItemText
              primary={benefit}
              primaryTypographyProps={{
                variant: 'h6',
                sx: { fontSize: { xs: '1rem', sm: '1.2rem' }, textAlign: 'left' },
              }}
            />
          </ListItem>
        ))}
      </List>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          color: '#ff6341',
          maxWidth: 900,
          mx: 'auto',
          mb: 2,
          mt: 4,
          textAlign: 'center',
        }}
      >
        To whom is the membership open?
      </Typography>

      <Box
        sx={{
          maxWidth: 900,
          mx: 'auto',
          border: '1px solid #ccc',
          borderRadius: 2,
          p: 3,
          mb: 3,
          maxHeight: { xs: 220, sm: 300 },
          overflowY: 'auto',
          bgcolor: '#f9f9f9',
          fontSize: { xs: '0.9rem', sm: '1rem' },
          lineHeight: 1.6,
        }}
      >
        <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
          {eligibilityPoints.map((point, i) => (
            <li key={i} style={{ marginBottom: '0.7rem' }}>
              {point}
            </li>
          ))}
        </ol>

        <Typography sx={{ mt: 2 }}>
          A structured process is followed to ensure decisions are based on clear and objective criteria outlined in this
          section. For NB individuals whom the board believe may not fully meet the established criteria but express
          interest in joining, a self-declaration is required for consideration.
        </Typography>
      </Box>

      {/* Acceptance checkbox and button */}
      <Box
        sx={{
          maxWidth: 900,
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 4,
          gap: 2,
          px: 1,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              color="primary"
            />
          }
          label="I have read and meet the eligibility criteria."
          sx={{ flexGrow: 1 }}
        />
        <Button
          variant="contained"
          disabled={!agreed}
          sx={{
            backgroundColor: '#ff6341',
            paddingX: 4,
            paddingY: 1.5,
            fontSize: { xs: '1rem', sm: '1.1rem' },
            borderRadius: '50px',
            boxShadow: 4,
            '&:hover': { backgroundColor: '#e65100' },
          }}
          onClick={handleOpenModal}
        >
          Continue to Membership Form
        </Button>
      </Box>

      {/* Fullscreen modal with iframe */}
      <IframeModal open={modalOpen} onClose={handleCloseModal} src={iframeSrc} />
    </Container>
  );
}
