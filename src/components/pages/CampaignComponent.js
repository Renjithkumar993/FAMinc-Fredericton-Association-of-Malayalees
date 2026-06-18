import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Container, Grid, Button, Typography, Box, Paper, Link, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import InfoIcon from '@mui/icons-material/Info';
import Breadcrumbs from '../Breadcrumbs';
import './CampaignComponent.css';
import HelmetWrapper from '../HelmetWrapper';

const ModalComponent = lazy(() => import('../ModalComponent'));

const CampaignComponent = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [iframeSrc, setIframeSrc] = useState('');
    const [videoUrls, setVideoUrls] = useState([]);
    const [newsLinks, setNewsLinks] = useState([]);
    const [donationProgress, setDonationProgress] = useState(0);
    const [lastUpdated, setLastUpdated] = useState('');

    const handleModalClose = () => setModalOpen(false);
    const handleModalShow = () => setModalOpen(true);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch(`${process.env.PUBLIC_URL}/config/savewayanad.json`);
                if (!response.ok) {
                    throw new Error('Failed to fetch configuration');
                }
                const data = await response.json();
                setIframeSrc(data[0].iframesavewayanad);
                setVideoUrls(data[0].videos);
                setNewsLinks(data[0].news);
                setDonationProgress(data[0].donationProgress.currentAmount);
                setLastUpdated(data[0].donationProgress.lastUpdated);
            } catch (error) {
                console.error('Error fetching configuration:', error);
            }
        };

        fetchConfig();
    }, []);

    return (
        <>
            <HelmetWrapper 
                pageTitle="Stand With Wayanad" 
                description="Stand with Wayanad: Donate now to support landslide relief and rebuilding efforts. Join the campaign organized by the Fredericton Association of Malayalees."
            />
            <Box sx={{ py: 6, mt: 8, minHeight: '100vh' }}>
                <Container maxWidth="lg">
                    <Box sx={{ mb: 4 }}>
                        <Breadcrumbs />
                    </Box>

                    {/* Header/Banner Section */}
                    <Paper 
                        elevation={0}
                        sx={{ 
                            borderRadius: 4, 
                            overflow: 'hidden', 
                            mb: 6,
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                            border: '1px solid rgba(0,0,0,0.08)'
                        }}
                    >
                        <Box
                            component="img"
                            src={`${process.env.PUBLIC_URL}/images/savewayanad/wayanad.jpg`}
                            alt="Wayanad Banner"
                            sx={{
                                width: '100%',
                                height: { xs: 200, sm: 350, md: 450 },
                                objectFit: 'cover',
                                display: 'block'
                            }}
                        />
                    </Paper>

                    {/* Main Content & Donation Card Grid */}
                    <Grid container spacing={5}>
                        {/* Left Side: Campaign Description */}
                        <Grid item xs={12} md={7}>
                            <Typography 
                                variant="h4" 
                                component="h1" 
                                sx={{ 
                                    fontWeight: 800, 
                                    mb: 3, 
                                    color: 'text.primary',
                                    lineHeight: 1.3,
                                    fontSize: { xs: '1.8rem', md: '2.4rem' }
                                }}
                            >
                                Stand With Wayanad: Donate now and be part of Wayanad's story of resilience and rebirth.
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, textAlign: 'left' }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1, color: '#e64a19' }}>
                                    <InfoIcon /> Our Home Needs Us
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                    The lush green hills of Wayanad, once a symbol of Kerala's natural beauty, now bear the scars of nature's fury. Devastating landslides have torn through our beloved district, leaving behind a trail of destruction and shattered lives.
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                    But in this moment of darkness, we have the power to be the light!!
                                </Typography>

                                <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1, color: '#e64a19', mt: 2 }}>
                                    <HelpOutlineIcon /> Your Support Can Rebuild Lives
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                    Fredericton Association of Malayalees (FAM) is reaching out to you - our extended family in Fredericton and beyond. Every dollar you contribute is a building block for a new home, a lifeline for a struggling family, and a beacon of hope for our brothers and sisters in Wayanad.
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                    The hills of Wayanad have always been our strength. Now, it's our turn to be theirs. Your contribution, no matter how small, will echo through the valleys of Wayanad as a testament to the unbreakable bond we share with our homeland.
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                    As the Fredericton Association of Malayalees (FAM), we stand as a bridge between our adopted home and our roots. Our community in Fredericton has always come together in times of need, and now, we have a chance to extend our hands across continents.
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Right Side: Donation Summary Widget & News */}
                        <Grid item xs={12} md={5}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    borderRadius: 4,
                                    border: '1px solid rgba(0,0,0,0.06)',
                                    backgroundColor: '#ffffff',
                                    textAlign: 'center',
                                    mb: 4,
                                    position: 'sticky',
                                    top: 100
                                }}
                            >
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', mb: 1 }}>
                                    Fundraising Campaign
                                </Typography>
                                <Typography variant="h3" sx={{ fontWeight: 800, color: '#e64a19', mb: 1.5 }}>
                                    ${donationProgress.toLocaleString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    Total Amount Received
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
                                    Last Updated: {lastUpdated}
                                </Typography>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={handleModalShow}
                                    startIcon={<FavoriteIcon />}
                                    sx={{
                                        py: 1.75,
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        boxShadow: '0 6px 20px rgba(230, 74, 25, 0.3)',
                                    }}
                                >
                                    Donate Now
                                </Button>
                            </Paper>

                            {/* Latest News Widget */}
                            {newsLinks.length > 0 && (
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        borderRadius: 4,
                                        border: '1px solid rgba(0,0,0,0.06)',
                                        backgroundColor: '#ffffff',
                                        textAlign: 'left'
                                    }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                                        <NewspaperIcon color="primary" /> Latest News
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                        {newsLinks.map((news, index) => (
                                            <Box key={index} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#e64a19', mt: 1, flexShrink: 0 }} />
                                                <Link 
                                                    href={news.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    sx={{ 
                                                        color: 'text.primary', 
                                                        textDecoration: 'none',
                                                        fontWeight: 600,
                                                        fontSize: '0.925rem',
                                                        lineHeight: 1.4,
                                                        '&:hover': { color: '#e64a19', textDecoration: 'underline' } 
                                                    }}
                                                >
                                                    {news.title}
                                                </Link>
                                            </Box>
                                        ))}
                                    </Box>
                                </Paper>
                            )}
                        </Grid>
                    </Grid>

                    {/* Videos Section */}
                    {videoUrls.length > 0 && (
                        <Box sx={{ mt: 8 }}>
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    fontWeight: 800, 
                                    mb: 4,
                                    letterSpacing: '-0.01em',
                                    textAlign: 'left'
                                }}
                            >
                                Media & Coverage
                            </Typography>
                            <Grid container spacing={4}>
                                {videoUrls.map((url, index) => (
                                    <Grid item xs={12} md={6} key={index}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                borderRadius: 4,
                                                overflow: 'hidden',
                                                boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                                                border: '1px solid rgba(0,0,0,0.06)'
                                            }}
                                        >
                                            <iframe 
                                                width="100%" 
                                                height="315" 
                                                src={url} 
                                                title={`Wayanad Landslide Video ${index + 1}`} 
                                                frameBorder="0" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                                referrerPolicy="strict-origin-when-cross-origin" 
                                                allowFullScreen
                                                style={{ display: 'block' }}
                                            />
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </Container>
            </Box>

            <Suspense fallback={<Typography align="center" sx={{ py: 4 }}>Loading...</Typography>}>
                <ModalComponent
                    open={modalOpen}
                    handleClose={handleModalClose}
                    iframeSrc={iframeSrc}
                />
            </Suspense>
        </>
    );
};

export default CampaignComponent;
