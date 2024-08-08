import React, { useState, useEffect } from 'react';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const JoinPageModal = ({ open, handleClose }) => {
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    // Example logic to set the iframe source
    // You can replace this with the actual logic to get the iframe source
    const src = ''; // Replace with actual source
    setIframeSrc(src);
  }, []);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '800px',
        height: '90%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        '@media (max-width: 600px)': {
          width: '100%',
          height: '100%',
          p: 2,
        },
      }}>
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 8 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        {iframeSrc ? (
          <iframe
            src={iframeSrc}
            style={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            title="Join Us Form"
          ></iframe>
        ) : (
          <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
            Please contact FAM by info@famnb.ca to get started
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default JoinPageModal;
