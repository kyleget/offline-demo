import { IconButton, Tooltip } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useState } from "react";

import * as serviceWorkerRegistration from "../serviceWorkerRegistration";

const AppUpdateButton = (): JSX.Element | null => {
  const [isReloading, setIsReloading] = useState(false);

  const handleInstallUpdate = async () => {
    setIsReloading(true);
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    serviceWorkerRegistration.unregister();
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <Tooltip
      borderRadius={4}
      fontSize="smaller"
      gutter={1}
      label="Update Available"
      placement="bottom"
    >
      <IconButton
        isLoading={isReloading}
        aria-label="Update Available"
        colorScheme="blue"
        icon={<RepeatIcon />}
        height="40px"
        isRound
        size="sm"
        width="40px"
        onClick={handleInstallUpdate}
      />
    </Tooltip>
  );
};

export default AppUpdateButton;
