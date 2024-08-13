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

  const { ref: firstCardRef, inView: firstCardInView } = useInView({ triggerOnce: true });
  const { ref: secondCardRef, inView: secondCardInView } = useInView({ triggerOnce: true });
  const { ref: thirdCardRef, inView: thirdCardInView } = useInView({ triggerOnce: true });

  return (
    <div className="component-container">
      <h1 className="title"><span className="hilite-color">Explore</span> Our Destinations</h1>
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
              initial={{ opacity: 0, rotateY: -90 }}
              animate={inView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
              className="location-card"
            >
              <div className="location-card-inner">
                <div className="location-card-front">
                  <img src={location.image} alt={location.name} className="location-image" />
                  <div className="location-content">
                    <FontAwesomeIcon icon={faMapMarkedAlt} className="icon mb-3" />
                    <h2 className="location-name">{location.name}</h2>
                  </div>
                </div>
                <div className="location-card-back">
                  <div className="location-content-back">
                    <p className="location-description">{location.description}</p>
                    <a href={location.link} target="_blank" rel="noopener noreferrer" className="learn-more-btn">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BacklinkInfo;
