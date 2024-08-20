import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import { FaFileDownload, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import './WhatWeDo.css';
import { Container, Button } from 'react-bootstrap';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  FaFileDownload: <FaFileDownload />,
  FaFacebook: <FaFacebook />,
  FaWhatsapp: <FaWhatsapp />
};

const WhatWeDo = () => {
  const containerRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    // Fetch the data from the JSON file
    fetch(`${process.env.PUBLIC_URL}/config/socialmedialinks.json`)
      .then(response => response.json())
      .then(data => setCardData(data.cardData))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (inView && cardData.length > 0) {
      const cards = gsap.utils.toArray('.whatwedoo-card');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            x: -250,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            backgroundColor: cardData[index % cardData.length].color,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 30%',
              scrub: true,
              markers: false,
            },
          }
        );
      });
    }
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach(instance => instance.kill());
    };
  }, [inView, cardData]);

  return (
    <Container>
      <div className="whatwedoo-container" ref={containerRef}>
        <div className="whatwedoo-cards" ref={ref}>
          {cardData.map((card) => (
            <div className="card-wrapper" key={card.id}>
              <div className="whatwedoo-card card-contents">
                <div className="card-description">
                  <h3 className="card-description__title">{card.title}</h3>
                  <p>{card.description}</p>
                </div>
                <div className="card-icon">{iconMap[card.icon]}</div>
                {card.link && (
                  <div className="text-center mt-3">
                    <Button
                      variant="primary"
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ backgroundColor: card.color }}
                    >
                      {iconMap[card.icon]} Open
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default WhatWeDo;
