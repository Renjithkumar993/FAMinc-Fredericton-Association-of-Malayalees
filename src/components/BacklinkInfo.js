import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';
import './BacklinkInfo.css';

const BacklinkInfo = () => {
  const locations = [
    {
      name: "Kerala",
      description: "Kerala is a state in India, known for its natural beauty, backwaters, and vibrant culture. It is the homeland of the Malayalee community.",
      image: `${process.env.PUBLIC_URL}/images/heroimages/Kerala-hero.avif`,
      link: "https://www.keralatourism.org/"
    },
    {
      name: "Fredericton",
      description: "Fredericton is the capital city of New Brunswick, Canada. It is a diverse and welcoming city where the Malayalee community has found a home away from home.",
      image: `${process.env.PUBLIC_URL}/images/heroimages/Fredericton-Hero.avif`,
      link: "https://tourismnewbrunswick.ca/fredericton"
    },
    {
      name: "New Brunswick",
      description: "New Brunswick is one of Canada's beautiful maritime provinces, known for its stunning landscapes, friendly people, and rich history.",
      image: `${process.env.PUBLIC_URL}/images/heroimages/nb.jpg`,
      link: "https://tourismnewbrunswick.ca/"
    },
  ];

  const { ref: firstCardRef, inView: firstCardInView } = useInView({ triggerOnce: false });
  const { ref: secondCardRef, inView: secondCardInView } = useInView({ triggerOnce: false });
  const { ref: thirdCardRef, inView: thirdCardInView } = useInView({ triggerOnce: false });

  return (
    <div className="component-container">
      <div className="header">
        <h1 className="title"><span className='hilite-color'>Welcome</span> to Our Places</h1>
      </div>
      <div className="locations">
        {locations.map((location, index) => {
          let ref = firstCardRef;
          let inView = firstCardInView;

          if (index === 1) {
            ref = secondCardRef;
            inView = secondCardInView;
          } else if (index === 2) {
            ref = thirdCardRef;
            inView = thirdCardInView;
          }

          return (
            <motion.div
              ref={ref}
              key={index}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="location-card shadow"
            >
              <img src={location.image} alt={location.name} className="location-image" />
              <div className="location-content">
                <FontAwesomeIcon icon={faMapMarkedAlt} className="icon mb-3" />
                <h2 className="mb-3">{location.name}</h2>
                <p className="mb-4">{location.description}</p>
                <a href={location.link} target="_blank" rel="noopener noreferrer" className="learn-more-btn">
                  Learn More
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BacklinkInfo;
