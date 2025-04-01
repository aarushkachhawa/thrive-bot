import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
};

export default useGoogleAnalytics; 