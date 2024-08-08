import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHelping, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './CampaignTeaserComponent.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CampaignTeaserComponent = () => {
    return (
        <Container className="teaser-container">
            <Row className="align-items-center text-center">
                <Col xs={12} className="teaser-title">
                Stand with Wayanad - Together We Can Make a Difference
                </Col>
            </Row>
            <Row className="align-items-center text-center">
                <Col xs={12} className="teaser-description">
                    <p>
                        Wayanad, Kerala has been severely affected by landslides. The situation is dire, and we need your support more than ever.
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faHandsHelping} /> Click below to learn more and find out how you can help.
                    </p>
                </Col>
            </Row>
            <Row className="align-items-center text-center mt-3">
                <Col xs={12} className="button-col">
                    <Button
                        href="/savewayanad"
                        size="md"
                        className="teaser-button"
                    >
                        Learn More
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CampaignTeaserComponent;
