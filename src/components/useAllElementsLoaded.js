import { useState, useEffect } from 'react';

const useAllElementsLoaded = (selectors) => {
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll(selectors);
    if (elements.length === 0) {
      setAllLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.every((entry) => entry.isIntersecting)) {
          setAllLoaded(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [selectors]);

  return allLoaded;
};

export default useAllElementsLoaded;
