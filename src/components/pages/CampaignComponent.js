import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { Typography, Box } from '@mui/material';
import './CampaignComponent.css';

const ModalComponent = lazy(() => import('../ModalComponent'));

const CampaignComponent = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [iframeSrc, setIframeSrc] = useState('');
    const [videoUrls, setVideoUrls] = useState([]);
    const [newsLinks, setNewsLinks] = useState([]);
    const [donationProgress, setDonationProgress] = useState(0);
    const [goalAmount, setGoalAmount] = useState(0);
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
                setGoalAmount(data[0].donationProgress.goalAmount);
                setLastUpdated(data[0].donationProgress.lastUpdated);
            } catch (error) {
                console.error('Error fetching configuration:', error);
            }
        };

        fetchConfig();
    }, []);

    return (
        <>
            <Container className="campaign-container mt-2">
                <Box className="campaign-header mt-5">
                    <Row>
                        <Col xs={12}>
                            <img src={`${process.env.PUBLIC_URL}/images/savewayanad/wayanad.jpg`} alt="Wayanad" className="header-image" />
                        </Col>
                    </Row>
                    <Row className="mt-4 text-center">
                        <Col xs={12}>
                            <Typography variant="h4" component="h1" className="campaign-title">
                                Stand With Wayanad: Donate now and be part of Wayanad's story of resilience and rebirth.
                            </Typography>
                        </Col>
                    </Row>
                    <Row className="mt-2 text-center">
                        <Col xs={12}>
                            <Typography variant="h6" component="p" className="donation-amount">
                                Total Amount Received: ${donationProgress.toLocaleString()}
                            </Typography>
                            <Typography variant="body2" component="p" className="last-updated">
     Last Updated: {lastUpdated}
 </Typography>
                        </Col>
                    </Row>
                    <Row className="mt-3 text-center">
                        <Col xs={12} md={6} className="mx-auto">
                            <Button
                                onClick={handleModalShow}
                                className="donate-button"
                            >
                                <img src={`${process.env.PUBLIC_URL}/images/icons/donateicon.png`} alt="Donate Icon" className="donate-icon" />
                                Make a Difference / Donate Now
                            </Button>
                        </Col>
                    </Row>
                </Box>

                <Box className="campaign-content mt-5">
                    <Row>
                        <Col xs={12}>
                            <Typography variant="h5" component="h2" className="section-title">
                                Our Home Needs Us
                            </Typography>
                            <Typography variant="body1" component="p" className="section-text">
                                The lush green hills of Wayanad, once a symbol of Kerala's natural beauty, now bear the scars of nature's fury. Devastating landslides have torn through our beloved district, leaving behind a trail of destruction and shattered lives.
                            </Typography>
                            <Typography variant="body1" component="p" className="section-text">
                                But in this moment of darkness, we have the power to be the light!!
                            </Typography>
                        </Col>
                    </Row>

                    <Row className="mt-5">
                        <Col xs={12}>
                            <Typography variant="h5" component="h2" className="section-title">
                                Your Support Can Rebuild Lives
                            </Typography>
                            <Typography variant="body1" component="p" className="section-text">
                                Fredericton Association of Malayalees (FAM) is reaching out to you - our extended family in Fredericton and beyond. Every dollar you contribute is a building block for a new home, a lifeline for a struggling family, and a beacon of hope for our brothers and sisters in Wayanad.
                            </Typography>
                            <Typography variant="body1" component="p" className="section-text">
                                The hills of Wayanad have always been our strength. Now, it's our turn to be theirs. Your contribution, no matter how small, will echo through the valleys of Wayanad as a testament to the unbreakable bond we share with our homeland.
                            </Typography>
                            <Typography variant="body1" component="p" className="section-text">
                                As the Fredericton Association of Malayalees (FAM), we stand as a bridge between our adopted home and our roots. Our community in Fredericton has always come together in times of need, and now, we have a chance to extend our hands across continents.
                            </Typography>
                           
                           
                           
                        </Col>
                    </Row>
                </Box>

                <Box className="latest-news mt-5">
                    <Row className="text-center">
                        <Col xs={12}>
                            <Typography variant="h6" component="h2" className="section-title">
                                Latest News
                            </Typography>
                            <ul className="news-list">
                                {newsLinks.map((news, index) => (
                                    <li key={index}>
                                        <a href={news.url} target="_blank" rel="noopener noreferrer">{news.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                    </Row>
                </Box>

                <Box className="campaign-videos mt-5">
                    <Row>
                        {videoUrls.map((url, index) => (
                            <Col xs={12} md={6} key={index} className="mb-4">
                                <iframe width="100%" height="315" src={url} title={`Wayanad Landslide Video ${index + 1}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            </Col>
                        ))}
                    </Row>
                </Box>
            </Container>

            <Suspense fallback={<div>Loading...</div>}>
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
