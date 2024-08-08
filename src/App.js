import React, { Suspense, lazy, useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './Typography.css';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import PageWithHelmet from './components/PageWithHelmet';
import Loading from './components/Loading';
import FullWidthImage from './components/FullWidthImage';
import { Element } from 'react-scroll';
import AdvertisingComponent from './components/AdvertisingComponent';
import BacklinkInfo from './components/BacklinkInfo';
import CampaignComponent from './components/pages/CampaignComponent';
import CampaignTeaserComponent from './components/pages/CampaignTeaserComponent';

const AboutUsPage = lazy(() => import('./components/pages/AboutUsPage'));
const EventSection = lazy(() => import('./components/pages/EventSection'));
const ContactUs = lazy(() => import('./components/pages/ContactUs'));
const EventDetail = lazy(() => import('./components/pages/EventDetail'));
const Steps = lazy(() => import('./components/Steps'));
const LandingPage = lazy(() => import('./components/Landingpage'));
const UpcomingEvent = lazy(() => import('./components/UpcomingEvent'));
const JoinPage = lazy(() => import('./components/pages/JoinPage'));
const JoinComponent = lazy(() => import('./components/JoinComponent'));
const Gallery = lazy(() => import('./components/pages/Gallery'));
const MissionVision = lazy(() => import('./components/MissionVision'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const FacebookPageEmbed = lazy(() => import('./components/FacebookPageEmbed'));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    return this.props.children; 
  }
}


const bgImage = `${process.env.PUBLIC_URL}/images/web_bg.png`

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    color: #333;
    line-height: 1.6;
    background-image: url(${bgImage}) !important;
  }
`;



const MainPage = React.memo(() => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preloadComponents = async () => {
      const components = [
        import('./components/Landingpage'),
        import('./components/AboutUs'),
        import('./components/MissionVision'),
        import('./components/FacebookPageEmbed'),
        import('./components/Steps'),
        import('./components/JoinComponent'),
        import('./components/UpcomingEvent')
      ];

      try {
        await Promise.all(components);
      } catch (error) {
        console.error('Error preloading components', error);
      } finally {
        setLoading(false);
      }
    };

    preloadComponents();
  }, []);

  if (loading) {
    return <Loading loading={true} />;
  }

  return (
    <>
      <Suspense fallback={<Loading loading={true} />}>
      <GlobalStyle />
        <Element name="home" id="home"><LandingPage /></Element>
        <CampaignTeaserComponent />
        <Element name="about" id='about'><AboutUs /></Element>
        <AdvertisingComponent />
        <Element name="mission" id="mission"><MissionVision /></Element>
        <FacebookPageEmbed />
        <Steps />
        <JoinComponent />
        <UpcomingEvent />
        <BacklinkInfo />
        <FullWidthImage />
     
      </Suspense>
    </>
  );
});

const App = () => {
  return (
    <div>
      <GlobalStyle />
   
      <NavigationBar />
      <ErrorBoundary>
        <Suspense fallback={<Loading loading={true} />}>
          <Routes>
            <Route path="/" element={<PageWithHelmet pageTitle="Fredericton Association of Malayalees" Component={MainPage} />} />
            <Route path="/aboutus" element={<PageWithHelmet pageTitle="About Us" Component={AboutUsPage} />} />
            <Route path="/events" element={<PageWithHelmet pageTitle="Events" Component={EventSection} />} />
            <Route path="/:eventId" element={<PageWithHelmet Component={EventDetail} />} />
            <Route path="/contactus" element={<PageWithHelmet pageTitle="Contact Us" Component={ContactUs} />} />
            <Route path="/joinus" element={<PageWithHelmet pageTitle="Join Us" Component={JoinPage} />} />
            <Route path="/gallery" element={<PageWithHelmet pageTitle="Gallery" Component={Gallery} />} />
            <Route path="/savewayanad" element={<PageWithHelmet pageTitle="save wayanad" Component={CampaignComponent} />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default App;
