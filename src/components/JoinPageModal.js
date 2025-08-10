import React, { useState, useEffect } from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function JoinPageModal({ open, handleClose }) {
  const iframeSrc =
    'https://www.zeffy.com/ticketing/fredericton-association-of-malayaleesfam-memberships--2025';

  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // Reset modal state each time opened
  useEffect(() => {
    if (open) {
      setStep(1);
      setAgreed(false);
      setIframeLoaded(false);
      setIframeError(false);
    }
  }, [open]);

  // Timeout to detect iframe load failure
  useEffect(() => {
    let timer;
    if (step === 2) {
      timer = setTimeout(() => {
        if (!iframeLoaded) setIframeError(true);
      }, 8000);
    }
    return () => clearTimeout(timer);
  }, [step, iframeLoaded]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { display: 'flex', flexDirection: 'column', height: '100%' } }}
    >
      {/* Header bar */}
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {step === 2 && (
              <IconButton edge="start" onClick={() => setStep(1)} aria-label="Back">
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap>
              {step === 1 ? 'Membership Eligibility' : 'Membership Payment'}
            </Typography>
          </Box>
          <IconButton edge="end" onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Content area */}
      {step === 1 && (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Scrollable eligibility text */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              px: { xs: 2, sm: 4 },
              py: 3,
            }}
          >
            <Typography variant="body1" paragraph>
              Membership of the FAM shall be available only to individuals who are:
            </Typography>
            <ol style={{ paddingLeft: '1.25rem', lineHeight: 1.6 }}>
              <li>Committed to furthering the FAM's objectives.</li>
              <li>Submit a written application to the BOD in a prescribed format.</li>
              <li>Pay the prescribed membership fees.</li>
              <li>
                Are residents of Fredericton and adjacent areas. Membership is not open to residents
                of cities or towns which have separate associations with similar objectives.
              </li>
              <li>The BOD has full authority to approve or reject membership applications.</li>
            </ol>
            <Typography variant="body1" paragraph sx={{ mt: 2 }}>
              A structured process is followed to ensure decisions are based on clear and objective
              criteria outlined in this section. For NB individuals whom the board believe may not
              fully meet the established criteria but express interest in joining, a self-declaration
              is required for consideration.
            </Typography>
          </Box>

          {/* Sticky footer */}
          <Box
            sx={{
              borderTop: '1px solid',
              borderColor: 'divider',
              p: 2,
              bgcolor: 'background.paper',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 1,
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
              sx={{ flexGrow: 1, minWidth: '200px' }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => setStep(2)}
                disabled={!agreed}
                sx={{
                  backgroundColor: '#ff6341',
                  '&:hover': { backgroundColor: '#e65100' },
                }}
              >
                Yes — Continue
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* Step 2: Iframe */}
      {step === 2 && (
        <Box sx={{ flex: 1, height: 0, position: 'relative' }}>
          {!iframeError ? (
            <iframe
              title="Join Membership"
              src={iframeSrc}
              style={{ width: '100%', height: '100%', border: 'none' }}
              onLoad={() => setIframeLoaded(true)}
            />
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 3,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Unable to display the form inside the modal.
              </Typography>
              <Typography paragraph>
                This form may block embedding. Please open it in a new tab.
              </Typography>
              <Button
                variant="contained"
                href={iframeSrc}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: '#ff6341',
                  '&:hover': { backgroundColor: '#e65100' },
                }}
              >
                Open in New Tab
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Dialog>
  );
}
