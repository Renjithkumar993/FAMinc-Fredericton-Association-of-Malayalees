import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './Typography.css';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import PageWithHelmet from './components/PageWithHelmet';
import Loading from './components/Loading';
import MainPage from './components/pages/MainPage';
import { createGlobalStyle } from 'styled-components';
import NotFoundPage from './components/pages/NotFoundPage';

const bgImage = `${process.env.PUBLIC_URL}/images/web_bg.png`;


const AboutUsPage = lazy(() => import('./components/pages/AboutUsPage'));
const EventSection = lazy(() => import('./components/pages/EventSection'));
const ContactUs = lazy(() => import('./components/pages/ContactUs'));
const EventDetail = lazy(() => import('./components/pages/EventDetail'));
const JoinPage = lazy(() => import('./components/pages/JoinPage'));
const Gallery = lazy(() => import('./components/pages/Gallery'));
const CampaignComponent = lazy(() => import('./components/pages/CampaignComponent'));

class App extends React.Component {
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

    const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      padding: 0;
      color: #333;
      line-height: 1.6;
      background-image: url(${bgImage}) !important;
    }
  `;

    
    return (
      <div>
            <GlobalStyle />
        <NavigationBar />
        <Suspense fallback={<Loading loading={true} />}>
          <Routes>
            <Route path="/" element={<PageWithHelmet pageTitle="Fredericton Association of Malayalees" Component={MainPage} />} />
            <Route path="/aboutus" element={<PageWithHelmet pageTitle="About Us" Component={AboutUsPage} />} />
            <Route path="/events" element={<PageWithHelmet pageTitle="Events" Component={EventSection} />} />
            <Route path="/:eventId" element={<PageWithHelmet Component={EventDetail} />} />
            <Route path="/contactus" element={<PageWithHelmet pageTitle="Contact Us" Component={ContactUs} />} />
            <Route path="/joinus" element={<PageWithHelmet pageTitle="Join Us" Component={JoinPage} />} />
            <Route path="/gallery" element={<PageWithHelmet pageTitle="Gallery" Component={Gallery} />} />
            <Route path="/savewayanad" element={<PageWithHelmet pageTitle="Save Wayanad" Component={CampaignComponent} />} />
            <Route path="*" element={<NotFoundPage />} /> 
          </Routes>
        </Suspense>
        <Footer />
      </div>
    );
  }
}

export default App;
