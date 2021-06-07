import { IconButton, Spinner, Tooltip } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useState } from "react";

const ReloadButton = () => {
  const [isReloading, setIsReloading] = useState(false);

  const handleClick = () => {
    setIsReloading(true);
  };

  if (isReloading) {
    return (
      <Spinner
        margin="5px"
        thickness="3px"
        emptyColor="gray.200"
        color="blue.400"
        size="md"
        speed="1s"
      />
    );
  }

  return (
    <Tooltip
      defaultIsOpen
      borderRadius={4}
      fontSize="smaller"
      gutter={5}
      label="Update Available"
      placement="bottom"
    >
      <IconButton
        onClick={handleClick}
        colorScheme="blue"
        aria-label="refresh"
        icon={<RepeatIcon />}
      />
    </Tooltip>
  );
};

export default ReloadButton;
