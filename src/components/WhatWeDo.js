import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import { FaFileDownload, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import './WhatWeDo.css';
import { Container, Button } from 'react-bootstrap';

gsap.registerPlugin(ScrollTrigger);

const initialCardData = [
  {
    id: 1,
    title: "Helpful Document",
    description: "We have a helpful document to guide you through.",
    icon: <FaFileDownload />,
    link: `${process.env.PUBLIC_URL}/documents/Welcome to Fredericton(2024-07-01)DRAFT.pdf`,
    color: '#d9534f'
  },
  {
    id: 2,
    title: "Join Facebook Group",
    description: "Join our Facebook group to stay connected with the community.",
    icon: <FaFacebook />,
    link: "https://www.facebook.com/share/3BRkpFoRkYSc1fVm/?mibextid=WUal2a",
    color: '#3b5998'
  },
  {
    id: 3,
    title: "Join WhatsApp Group",
    description: "Join our WhatsApp group for instant updates.",
    icon: <FaWhatsapp />,
    link: "https://chat.whatsapp.com/IS3UUoZ1cqW9p6NLRg5QZB",
    color: '#25D366'
  }
];

const colors = ['#d9534f', '#3b5998', '#25D366'];

const WhatWeDo = () => {
  const containerRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
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
            backgroundColor: colors[index % colors.length],
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
  }, [inView]);

  return (
    <Container>
      <div className="whatwedoo-container" ref={containerRef}>
        <div className="whatwedoo-cards" ref={ref}>
          {initialCardData.map((card) => (
            <div className="card-wrapper" key={card.id}>
              <div className="whatwedoo-card card-contents">
                <div className="card-description">
                  <h3 className="card-description__title">{card.title}</h3>
                  <p>{card.description}</p>
                </div>
                <div className="card-icon">{card.icon}</div>
                {card.link && (
                  <div className="text-center mt-3">
                    <Button
                      variant="primary"
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ backgroundColor: card.color }}
                    >
                      {card.icon} Open
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
