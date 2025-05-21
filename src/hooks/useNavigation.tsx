
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavigation = () => {
  const { pathname } = useLocation();
  
  // This effect will run whenever the pathname changes
  useEffect(() => {
    // Scroll to the top of the page on route change
    window.scrollTo(0, 0);
    
    // You could also add other navigation-related logic here if needed
  }, [pathname]);

  // Check if the current path is a dashboard route
  const isDashboardRoute = pathname.startsWith('/dashboard');
  
  return {
    isDashboardRoute,
    pathname,
  };
};
