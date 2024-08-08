import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <footer className="footer-section">
      <Container>
        <Row>
          <Col md={4}>
            <div className="footer-widget">
              <h3>About Us</h3>
              <p>
                Fredericton Association Of Malayalees is a non-profit,
                non-political, non-religious association for promoting the
                cultural and social activities of Malayalees in Fredericton.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="footer-widget">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li>
                  <button onClick={() => handleNavigate('/joinus')} className="link-button">
                    Register
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('/aboutus')} className="link-button">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('/events')} className="link-button">
                    Buy Tickets
                  </button>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={4}>
            <div className="footer-widget">
              <h3>Contact Us</h3>
              <p>
                Email: <a href="mailto:info@famnb.ca">info@famnb.ca</a>
              </p>
              <p>Address: Fredericton, New Brunswick, Canada</p>
            </div>
          </Col>
        </Row>
        <Row className="footer-bottom">
          <Col md={12} className="text-center">
            <p>© 2024 Fredericton Association Of Malayalees</p>
            <div className="footer-social">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
