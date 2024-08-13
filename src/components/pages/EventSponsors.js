import React from 'react';
import { Grid, Box, Typography, Card, CardMedia, useTheme } from '@mui/material';

const goldSponsor = `${process.env.PUBLIC_URL}/images/sponsors/eventsponsors/sponsor1.png`;

const bronzeSponsors = [
  `${process.env.PUBLIC_URL}/images/sponsors/eventsponsors/sponsor2.png`,
  `${process.env.PUBLIC_URL}/images/sponsors/eventsponsors/sponsor3.png`,
  `${process.env.PUBLIC_URL}/images/sponsors/eventsponsors/sponsor4.png`,
];

const EventSponsors = () => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        padding: '40px 20px', 
        backgroundColor: 'inherit',
        textAlign: 'center'
      }}
    >
      <Typography 
        variant="h3" 
        sx={{ 
          fontWeight: 'bold', 
          marginBottom: '30px', 
          letterSpacing: '1px', 
          color: theme.palette.text.primary 
        }}
      >
        Our Event Sponsors
      </Typography>

     
      <Box mb={6}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold', 
            marginBottom: '20px', 
            color: theme.palette.warning.main
          }}
        >
          Gold Sponsor
        </Typography>
        <Card 
          sx={{ 
            maxWidth: '600px',
            margin: '0 auto',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
            '&:hover': {
              transform: 'translateY(-10px)',
              boxShadow: theme.shadows[6],
            }
          }}
        >
          <CardMedia
            component="img"
            image={goldSponsor}
            alt="Gold Sponsor"
            sx={{ 
              maxHeight: '400px', 
              objectFit: 'contain', 
              borderRadius: '8px'
            }}
          />
        </Card>
      </Box>

     
      <Box>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold', 
            marginBottom: '20px', 
            color: theme.palette.info.main 
          }}
        >
          Bronze Sponsors
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {bronzeSponsors.map((sponsor, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card 
                sx={{ 
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: theme.shadows[4],
                  }
                }}
              >
                <CardMedia
                  component="img"
                  image={sponsor}
                  alt={`Bronze Sponsor ${index + 1}`}
                  sx={{ 
                    maxHeight: '200px', 
                    objectFit: 'contain', 
                    borderRadius: '8px'
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default EventSponsors;
