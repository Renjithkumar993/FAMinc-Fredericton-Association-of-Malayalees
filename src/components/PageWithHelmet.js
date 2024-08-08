import React from 'react';
import HelmetWrapper from './HelmetWrapper';

const PageWithHelmet = ({ pageTitle, Component }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fredericton Association of Malayalees",
    "url": "https://famnb.ca",
    "logo": "https://famnb.ca/images/logofam.jpg",
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61552104893247"
    ]
  };

  return (
    <>
      <HelmetWrapper 
        pageTitle={pageTitle} 
        description={`Learn more about ${pageTitle} at the Fredericton Association of Malayalees.`} 
        structuredData={structuredData}
      />
      <Component />
    </>
  );
};

export default PageWithHelmet;
