import { useState, useEffect } from 'react';

const useOffline = () => {
  const [isOffline, setIsOffline] = useState(navigator.onLine);

  useEffect(() => {
    window.addEventListener('online', () => setIsOffline(false));
    window.addEventListener('offline', () => setIsOffline(true));

    return () => {
      window.removeEventListener('online', () => setIsOffline(false));
      window.removeEventListener('offline', () => setIsOffline(true));
    };
  }, []);

  return {
    isOffline,
  }
};

export default useOffline;
