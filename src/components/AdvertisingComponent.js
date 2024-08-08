import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import './AdvertisingComponent.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AdvertisingComponent = () => {
    const [adData, setAdData] = useState(null);
    const [clickCount, setClickCount] = useState(0);
    const adDataUrl = `${process.env.PUBLIC_URL}/config/adData.json`;
    const [startCount, setStartCount] = useState(false);

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    useEffect(() => {
        const fetchAdData = async () => {
            try {
                const response = await fetch(adDataUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAdData(data);
            } catch (error) {
                console.error('Error fetching ad data:', error);
            }
        };

        fetchAdData();

        const storedClickCount = localStorage.getItem('clickCount');
        if (storedClickCount) {
            setClickCount(parseInt(storedClickCount, 10));
        }
    }, [adDataUrl]);

    useEffect(() => {
        if (inView) {
            setStartCount(true);
        } else {
            setStartCount(false);
        }
    }, [inView]);

    const handleButtonClick = () => {
        const newClickCount = clickCount + 1;
        setClickCount(newClickCount);
        localStorage.setItem('clickCount', newClickCount);
        console.log('New click count:', newClickCount);
    };

    if (!adData) {
        return <div>Loading ad...</div>;
    }

    return (
        <Container className="advertising-container align-items-center" ref={ref}>
            <Row className="align-items-center justify-content-center text-center">
                <Col xs={12} className="ad-label">
                    Our Sponsor
                </Col>
                <Col xs="auto" className="image-col">
                    <img src={`${process.env.PUBLIC_URL}/images/sponsors/khama.jpg`} alt="Sponsor Image" className="sponsor-image" />
                </Col>
                <Col xs="auto" className="image-col">
                    <a href={adData.linkUrl} target="_blank" rel="noopener noreferrer">
                        <img src={adData.imageUrl} alt={adData.altText} className="advertising-image img-fluid" />
                    </a>
                </Col>
                <Col xs="auto" className="text-col">
                    <div className="advertising-text">
                        <h4>{adData.title}</h4>
                        <div className="stats-container">
                            {startCount && (
                                <div className="countup">
                                    <i className="fas fa-smile"></i>
                                    <CountUp start={0} end={800} duration={3.5} />
                                    &nbsp;+ Happy Clients
                                </div>
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="align-items-center justify-content-center text-center mt-1">
                <Col xs="auto" className="button-col">
                    <Button
                        href={adData.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="sm"
                        className="adv-button"
                        onClick={handleButtonClick}
                    >
                        Learn More
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default AdvertisingComponent;
