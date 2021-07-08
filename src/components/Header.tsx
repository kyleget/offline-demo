import { Box, Container, Flex, Text } from "@chakra-ui/react";

import DinoIcon from "./DinoIcon";
import AppUpdateButton from "./AppUpdateButton";
import Menu from "./Menu";

type Props = {
  isOffline: boolean;
  updateAvailable: boolean;
};

const Header = ({ isOffline, updateAvailable }: Props) => {
  return (
    <Box
      borderBottomColor="gray.300"
      borderBottomWidth={1}
      background="gray.50"
      left="0"
      right="0"
      position="fixed"
      paddingTop={4}
      paddingBottom={4}
    >
      <Container maxWidth="container.md">
        <Flex justify="space-between">
          <Box width="40px">
            {isOffline && <DinoIcon />}
            {updateAvailable && <AppUpdateButton />}
          </Box>
          <Text textAlign="center" fontSize="2xl" fontWeight="semibold">
            Messages 2.0
          </Text>
          <Box width="40px">
            <Menu />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
