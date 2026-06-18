import React, { Suspense, lazy } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
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

// Define a unified premium theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#e64a19', // Traditional Kerala orange/saffron
      light: '#ff7d47',
      dark: '#ac1900',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffb300', // Kerala gold accent
      light: '#ffe54c',
      dark: '#c68400',
      contrastText: '#1a1a1a',
    },
    background: {
      default: '#fbfbfb',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#4a4a4a',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Open Sans', sans-serif",
    h1: {
      fontFamily: "'Outfit', 'Baloo 2', sans-serif",
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: "'Outfit', 'Baloo 2', sans-serif",
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: "'Outfit', 'Baloo 2', sans-serif",
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: "'Outfit', 'Baloo 2', sans-serif",
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontFamily: "'Outfit', 'Baloo 2', sans-serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "'Outfit', 'Baloo 2', sans-serif",
      fontWeight: 600,
    },
    button: {
      fontFamily: "'Inter', 'Open Sans', sans-serif",
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30, // Unified pill buttons
          padding: '8px 24px',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(230, 74, 19, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
  },
});

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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1>Something went wrong.</h1>
            <button onClick={() => window.location.reload()}>Reload Page</button>
          </div>
        </ThemeProvider>
      );
    }

    const GlobalStyle = createGlobalStyle`
      body {
        margin: 0;
        padding: 0;
        color: #1a1a1a;
        line-height: 1.6;
        background-color: #fbfbfb !important;
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
      </ThemeProvider>
    );
  }
}

export default App;
