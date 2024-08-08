import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './LandingPage.css';

const slides = [
  {
    image: `${process.env.PUBLIC_URL}/images/heroimages/Fredericton_Sunset_2021.avif`,
    welcome: 'Welcome to FAM',
    description: 'Fredericton Association of Malayalees (FAM) is a registered non-profit organization established under the Society Act in 2021.',
    primaryBtn: { text: 'About Us', action: '#about' },
    secondaryBtn: { text: 'Learn more', action: '/aboutus' }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/heroimages/Kerala-hero.avif`,
    welcome: 'Join us for our events',
    description: 'Explore our upcoming events and join us for a wonderful experience.',
    primaryBtn: { text: 'Events', action: '/events' },
    secondaryBtn: { text: 'More info', action: '/events' }
  },
  {
    image: `${process.env.PUBLIC_URL}/images/heroimages/Kerala-hero1.avif`,
    welcome: 'Be a part of our community',
    description: 'Join us and be a part of a vibrant and supportive community.',
    primaryBtn: { text: 'Join Now', action: '/joinus' },
    secondaryBtn: { text: 'Learn more', action: '/aboutus' }
  }
];

const LandingPage = () => {
  const navigate = useNavigate();

  const handlePrimaryButtonClick = (action) => {
    if (action.startsWith('#')) {
      const element = document.querySelector(action);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(action);
    }
  };

  return (
    <div className="landing-page">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={1000}
        emulateTouch={false}
        swipeable={false}
      >
        {slides.map((slide, index) => (
          <div key={index} className="carousel-slide" style={{ backgroundImage: `url(${slide.image})` }}>
            <div className="overlay"></div>
            <div className="text-content">
              <h2 className="welcome-message">{slide.welcome}</h2>
              <p>{slide.description}</p>
              <div className="button-group">
                <button className="primary-btn" onClick={() => handlePrimaryButtonClick(slide.primaryBtn.action)}>
                  {slide.primaryBtn.text}
                </button>
                <button className="secondary-btn" onClick={() => navigate(slide.secondaryBtn.action)}>
                  {slide.secondaryBtn.text}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default LandingPage;
