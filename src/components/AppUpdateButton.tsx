import { IconButton, Tooltip } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

const AppUpdateButton = (): JSX.Element | null => {
  const handleInstallUpdate = () => {
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
        bottom={6}
        position="fixed"
        right={6}
        aria-label="Update Available"
        colorScheme="blue"
        icon={<RepeatIcon />}
        height="40px"
        isRound
        size="sm"
        width="40px"
        onClick={handleInstallUpdate}
        zIndex={2}
      />
    </Tooltip>
  );
};

export default AppUpdateButton;
