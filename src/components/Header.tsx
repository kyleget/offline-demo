import { Box, Container, Flex, Text } from "@chakra-ui/react";

import DinoIcon from "./DinoIcon";

const Header = () => {
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
          <Box width="40px" />
          <Text textAlign="center" fontSize="2xl" fontWeight="semibold">
            Messages
          </Text>
          <Box width="40px">
            <DinoIcon />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
