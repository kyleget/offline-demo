import { useState, useEffect } from "react";

const checkNetworkStatus = () =>
  new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => resolve(true);
    xhr.onerror = () => resolve(false);
    xhr.open("GET", "/isonline.txt", true);
    xhr.send();
  });

const useOffline = () => {
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [checkingNetworkStatus, setCheckingNetworkStatus] = useState(true);

  useEffect(() => {
    (async () => {
      const isOnline = await checkNetworkStatus();
      setIsOffline(!isOnline);
      setCheckingNetworkStatus(false);
      window.addEventListener("online", () => setIsOffline(false));
      window.addEventListener("offline", () => setIsOffline(true));
    })();

    return () => {
      window.removeEventListener("online", () => setIsOffline(false));
      window.removeEventListener("offline", () => setIsOffline(true));
    };
  }, []);

  return {
    isOffline,
    checkingNetworkStatus,
  };
};

export default useOffline;
