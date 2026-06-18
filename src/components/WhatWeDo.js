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
    const rotation = index === 0 ? -1.2 : index === 1 ? 1.5 : -1;
    const xOffset = index === 0 ? -6 : index === 1 ? 6 : -4;

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
        scale: 1.03,
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
          width: '100%',
          pt: 1.5,
          pb: 3
        }}
      >
        {cardData.map((card, index) => {
          const cardVar = getCardVariants(index);

          return (
            <Box
              key={card.id}
              component={motion.div}
              variants={cardVar}
              whileHover="hover"
              sx={{
                position: 'relative',
                marginTop: index === 0 ? 0 : '-18px', // Creates the overlapping vertical card stack effect
                zIndex: index + 1,
              }}
            >
              <Card
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: { xs: 2.25, sm: 2.75 },
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 4,
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  overflow: 'hidden',
                  transition: 'border 0.3s ease, box-shadow 0.3s ease',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '6px',
                    backgroundColor: card.color,
                    borderRadius: '4px 0 0 4px',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover': {
                    borderColor: `${card.color}50`,
                    boxShadow: `0 16px 35px ${card.color}18`,
                    '&::before': {
                      width: '8px',
                    },
                    '& .brand-icon-wrapper': {
                      transform: 'scale(1.08)',
                      backgroundColor: `${card.color}15`,
                    },
                    '& .action-button': {
                      boxShadow: `0 4px 14px ${card.color}35`,
                      '& .btn-arrow': {
                        transform: 'translateX(3px)',
                      }
                    }
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flex: 1, pl: 0.5 }}>
                  <Box 
                    className="brand-icon-wrapper"
                    sx={{ 
                      color: card.color, 
                      fontSize: '1.8rem', 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: `${card.color}08`,
                      p: 1.5,
                      borderRadius: 3.5,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {iconMap[card.icon]}
                  </Box>
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 850, 
                        mb: 0.5,
                        fontSize: '1.15rem',
                        letterSpacing: '-0.015em',
                        color: 'text.primary',
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        fontSize: '0.875rem', 
                        lineHeight: 1.5,
                        maxWidth: { xs: '200px', sm: '280px', md: '300px' }
                      }}
                    >
                      {card.description}
                    </Typography>
                  </Box>
                </Box>
                
                {card.link && (
                  <Button
                    variant="contained"
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-button"
                    sx={{
                      backgroundColor: card.color,
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      borderRadius: '25px',
                      px: 3,
                      py: 1,
                      boxShadow: 'none',
                      textTransform: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: card.color,
                        filter: 'brightness(0.95)',
                      }
                    }}
                  >
                    <span>Open</span>
                    <ChevronRightIcon 
                      className="btn-arrow"
                      sx={{ 
                        fontSize: '1.1rem', 
                        transition: 'transform 0.2s ease' 
                      }} 
                    />
                  </Button>
                )}
              </Card>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default WhatWeDo;
