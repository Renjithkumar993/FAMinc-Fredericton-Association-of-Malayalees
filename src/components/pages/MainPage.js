import React, { useState, useEffect, Suspense } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Element } from 'react-scroll';
import Loading from '../Loading';
import FullWidthImage from '../FullWidthImage';
import AdvertisingComponent from '../AdvertisingComponent';
import BacklinkInfo from '../BacklinkInfo';
import CampaignTeaserComponent from '../pages/CampaignTeaserComponent';
import HelmetWrapper from '../HelmetWrapper';

const LandingPage = React.lazy(() => import('../Landingpage'));
const AboutUs = React.lazy(() => import('../AboutUs'));
const MissionVision = React.lazy(() => import('../MissionVision'));
const FacebookPageEmbed = React.lazy(() => import('../FacebookPageEmbed'));
const Steps = React.lazy(() => import('../Steps'));
const JoinComponent = React.lazy(() => import('../JoinComponent'));
const UpcomingEvent = React.lazy(() => import('../UpcomingEvent'));





const MainPage = React.memo(() => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preloadComponents = async () => {
      const components = [
        import('../Landingpage'),
        import('../AboutUs'),
        import('../MissionVision'),
        import('../FacebookPageEmbed'),
        import('../Steps'),
        import('../JoinComponent'),
        import('../UpcomingEvent')
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
    <HelmetWrapper 
  pageTitle="Fredericton Association of Malayalees" 
  description="Join the Fredericton Association of Malayalees (FAM) in Canada to celebrate and promote the vibrant culture of Kerala. Connect with Malayalees, Indians in Fredericton, and New Brunswick." 
/>

          <Suspense fallback={<Loading loading={true} />}>
  
        <Element name="home" id="home"><LandingPage /></Element>
        <CampaignTeaserComponent />
        <Element name="about" id="about"><AboutUs /></Element>
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

export default MainPage;
