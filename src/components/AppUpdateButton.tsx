import { IconButton, Tooltip } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useState } from "react";

const AppUpdateButton = (): JSX.Element | null => {
  const [isReloading, setIsReloading] = useState(false);

  const handleInstallUpdate = () => {
    setIsReloading(true);
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
    window.location.reload();
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
