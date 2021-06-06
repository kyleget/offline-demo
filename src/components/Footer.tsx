import {
  Container,
  Box,
  Flex,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const Footer = () => {
  return (
    <Box position="fixed" left={0} right={0} bottom={0}>
      <Box
        borderTopColor="gray.300"
        borderTopWidth={1}
        bgColor="gray.50"
        paddingTop={5}
        paddingBottom={16}
      >
        <Container maxWidth="container.md">
          <Flex>
            <Input
              colorScheme="whatsapp"
              bgColor="white"
              placeholder="Send a message"
              marginRight={2}
            />
            <IconButton
              colorScheme="whatsapp"
              aria-label="send"
              icon={<ArrowForwardIcon />}
            />
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
