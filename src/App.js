import React, { Suspense, lazy } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import './Typography.css';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
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
const UsefulLinks = lazy(() => import("./components/UsefulLinks"));
const CampaignComponent = lazy(() => import("./components/pages/CampaignComponent"));




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, events: [], loading: true, error: null };
  }

  componentDidMount() {
    this.fetchEvents();
  }


  async fetchEvents() {
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/config/events.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const eventsData = await response.json();
      

      const updatedEvents = eventsData.map((event) => ({
        eventId: event.title.replace(/\s+/g, '').toLowerCase(),
        isopen: event.isOpen,
      }));

    
      this.setState({ events: updatedEvents, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }


  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  render() {
    const { hasError, events, loading } = this.state;

    if (hasError) {
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


    const EventDetailWrapper = () => {
      const { eventId } = useParams();
      const event = events.find((e) => e.eventId === eventId);


      if (!event || !event.isopen) {
        return <NotFoundPage />; 
      }

      return <EventDetail event={event} />;
    };

    return (
      <div>
        <GlobalStyle />
        <NavigationBar />
        <Suspense fallback={<Loading loading={true} />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/aboutus" element={<AboutUsPage />} />
            <Route path="/events" element={<EventSection />} />
            <Route path="/:eventId" element={loading ? <Loading loading={true} /> : <EventDetailWrapper />} />
            <Route path="/usefullinks" element={<UsefulLinks />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/joinus" element={<JoinPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/savewayanad" element={<CampaignComponent />} />
           

            

            

           
          </Routes>
        </Suspense>
        <Footer />
      </div>
    );
  }
}

export default App;
