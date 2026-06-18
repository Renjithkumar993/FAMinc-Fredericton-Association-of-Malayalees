import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileDownload, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { Container, Button, Typography, Box, Card } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const iconMap = {
  FaFileDownload: <FaFileDownload />,
  FaFacebook: <FaFacebook />,
  FaWhatsapp: <FaWhatsapp />
};

// Custom premium gradients matching the original card colors
const gradientMap = {
  '#d9534f': 'linear-gradient(135deg, #e64a19 0%, #c5390c 100%)', // Saffron/Tomato Red
  '#3b5998': 'linear-gradient(135deg, #4267B2 0%, #2e4a82 100%)', // Facebook Blue
  '#25D366': 'linear-gradient(135deg, #25D366 0%, #1c9c4b 100%)'  // WhatsApp Green
};

const WhatWeDo = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/config/socialmedialinks.json`)
      .then(response => response.json())
      .then(data => setCardData(data.cardData || []))
      .catch(error => console.error('Error fetching social media links config:', error));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const getCardVariants = (index) => {
    // Staggered rotation tilt, exactly matching the look and feel of the original design
    const rotation = index === 0 ? -2 : index === 1 ? 2 : -1.5;
    const xOffset = index === 0 ? -4 : index === 1 ? 4 : -2;

    return {
      hidden: { 
        opacity: 0, 
        y: 40,
        rotate: rotation,
        x: xOffset,
      },
      show: { 
        opacity: 1, 
        y: 0,
        rotate: rotation,
        x: xOffset,
        transition: { 
          type: 'spring', 
          stiffness: 100, 
          damping: 16 
        } 
      },
      hover: {
        scale: 1.04,
        rotate: 0,
        x: 0,
        y: -6,
        zIndex: 10,
        transition: { 
          type: 'spring', 
          stiffness: 300, 
          damping: 20 
        }
      }
    };
  };

  if (cardData.length === 0) return null;

  return (
    <Container maxWidth="sm" sx={{ px: 0 }}>
      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
          width: '100%',
          pt: 1,
          pb: 2
        }}
      >
        {cardData.map((card, index) => {
          const cardVar = getCardVariants(index);
          const cardGradient = gradientMap[card.color] || card.color;

          return (
            <Box
              key={card.id}
              component={motion.div}
              variants={cardVar}
              whileHover="hover"
              sx={{
                position: 'relative',
              }}
            >
              <Card
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: { xs: 2.5, sm: 3.25 },
                  background: cardGradient,
                  borderRadius: 4,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  overflow: 'hidden',
                  color: '#ffffff',
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: `0 20px 40px ${card.color}40`,
                    '& .brand-icon-wrapper': {
                      transform: 'scale(1.1) rotate(5deg)',
                      opacity: 0.95
                    },
                    '& .action-button': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                      '& .btn-arrow': {
                        transform: 'translateX(3px)',
                      }
                    }
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  {/* Left Content Area */}
                  <Box sx={{ flex: 1, textAlign: 'left', pr: 2 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 800, 
                        mb: 0.75,
                        fontSize: '1.25rem',
                        letterSpacing: '-0.015em',
                        color: '#ffffff',
                        fontFamily: "'Outfit', 'Baloo 2', sans-serif"
                      }}
                    >
                      {card.title}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: '0.9rem', 
                        lineHeight: 1.5,
                        color: 'rgba(255, 255, 255, 0.9)',
                        maxWidth: '290px',
                        mb: 2
                      }}
                    >
                      {card.description}
                    </Typography>

                    {card.link && (
                      <Button
                        variant="contained"
                        href={card.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-button"
                        sx={{
                          backgroundColor: '#ffffff',
                          color: card.color,
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          borderRadius: '25px',
                          px: 3.5,
                          py: 1,
                          boxShadow: 'none',
                          textTransform: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.5,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: '#ffffff',
                            color: card.color
                          }
                        }}
                      >
                        <span>Open Link</span>
                        <ChevronRightIcon 
                          className="btn-arrow"
                          sx={{ 
                            fontSize: '1.15rem', 
                            transition: 'transform 0.2s ease' 
                          }} 
                        />
                      </Button>
                    )}
                  </Box>

                  {/* Right Icon Area */}
                  <Box 
                    className="brand-icon-wrapper"
                    sx={{ 
                      color: '#ffffff', 
                      fontSize: '4.5rem', 
                      display: 'flex', 
                      alignItems: 'center',
                      opacity: 0.85,
                      transition: 'all 0.3s ease',
                      flexShrink: 0
                    }}
                  >
                    {iconMap[card.icon]}
                  </Box>
                </Box>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default WhatWeDo;
