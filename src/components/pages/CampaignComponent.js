import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
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

    const progress = (donationProgress / goalAmount) * 100;

    return (
        <>
            <Box className="campaign">
                <Row>
                    <Col xs={12} className="header-image mt-5">
                        <img src={`${process.env.PUBLIC_URL}/images/savewayanad/wayanad.jpg`} alt="Wayanad" className="img-fluid" />
                    </Col>
                </Row>
                <Row className="align-items-center text-left mt-4 donation-header">
                    <Col xs={12} md={8} className="donation-info">
                        <Typography variant="h4" component="h1">
                            Stand With Wayanad: Donate now and be part of Wayanad's story of resilience and rebirth.
                        </Typography>
                        <Typography variant="h6" component="h2">
                            Total Amount Collected: ${donationProgress.toLocaleString()} 
                        </Typography>
                        <Typography variant="body2" component="p">
                            Last Updated: {lastUpdated}
                        </Typography>
                    </Col>
                    <Col xs={12} md={4} className="button-col mt-3">
                        <Button
                            onClick={handleModalShow}
                            className="donate-button"
                        >
                            <img src={`${process.env.PUBLIC_URL}/images/icons/donateicon.png`} alt="Donate Icon" className="donate-icon" />
                            Make a Difference / Donate Now
                        </Button>
                    </Col>
                </Row>
                <Row className="align-items-center text-center mt-4">
                    <Col xs={12}>
                        <Typography variant="h4" component="h1">
                            Our Home Needs Us
                        </Typography>
                    </Col>
                </Row>
                <Row className="align-items-center text-left mt-4">
                    <Col xs={12}>
                        <Typography variant="body1" component="p" className="campaign-description">
                            The lush green hills of Wayanad, once a symbol of Kerala's natural beauty, now bear the scars of nature's fury. Devastating landslides have torn through our beloved district, leaving behind a trail of destruction and shattered lives.
                        </Typography>
                        <Typography variant="body1" component="p" className="campaign-description">
                            But in this moment of darkness, we have the power to be the light!!
                        </Typography>
                    </Col>
                </Row>
                <Row className="align-items-center text-left mt-4">
                    <Col xs={12}>
                        <Typography variant="h5" component="h2">
                            Your Support Can Rebuild Lives
                        </Typography>
                        <Typography variant="body1" component="p" className="campaign-description">
                            Fredericton Association of Malayalees (FAM) is reaching out to you - our extended family in Fredericton and beyond. Every dollar you contribute is a building block for a new home, a lifeline for a struggling family, and a beacon of hope for our brothers and sisters in Wayanad.
                        </Typography>
                        <Typography variant="h5" component="h2" className="mt-3">
                            Act Now, Impact Forever
                        </Typography>
                        <Typography variant="body1" component="p" className="campaign-description">
                            The hills of Wayanad have always been our strength. Now, it's our turn to be theirs. Your contribution, no matter how small, will echo through the valleys of Wayanad as a testament to the unbreakable bond we share with our homeland.
                        </Typography>
                        <Typography variant="body1" component="p" className="campaign-description mt-3">
                            As the Fredericton Association of Malayalees (FAM), we stand as a bridge between our adopted home and our roots. Our community in Fredericton has always come together in times of need, and now, we have a chance to extend our hands across continents.
                        </Typography>
                    </Col>
                </Row>
                <Row className="align-items-center text-center mt-4">
                    <Col xs={12}>
                        <Typography variant="h6" component="h2">
                            Latest News
                        </Typography>
                        <ul className="latest-news">
                            {newsLinks.map((news, index) => (
                                <li key={index}>
                                    <a href={news.url} target="_blank" rel="noopener noreferrer">{news.title}</a>
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
                <Row className="align-items-center text-center mt-4">
                    {videoUrls.map((url, index) => (
                        <Col xs={12} md={6} key={index}>
                            <iframe width="100%" height="315" src={url} title={`Wayanad Landslide Video ${index + 1}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </Col>
                    ))}
                </Row>
            </Box>

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

