import { useEffect, useState } from "react";

const useAppUpdate = (isOffline: boolean) => {
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);
  const [serverVersion, setServerVersion] = useState<string>();

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && !isOffline) {
      const interval = setInterval(async () => {
        const response = await fetch(`${window.origin}/version.txt`);
        if (response.ok) {
          const version = await response.text();
          const cleanedVersion = version.replace(/(\r\n|\n|\r)/gm, "");
          setServerVersion(cleanedVersion);
          setUpdateAvailable(process.env.REACT_APP_VERSION !== cleanedVersion);
        }
      }, 10000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isOffline, setUpdateAvailable]);

  return {
    updateAvailable,
    serverVersion,
  };
};

export default useAppUpdate;
