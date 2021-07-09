import {
  Container,
  Box,
  Flex,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

type Props = {
  onSubmit: (message: string) => void;
  isOffline: boolean;
  isDisabled: boolean;
};

const Footer = ({ onSubmit, isOffline, isDisabled = false }: Props) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue) {
      return;
    }
    onSubmit(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Box position="fixed" left={0} right={0} bottom={0}>
      <Box
        borderTopColor="gray.300"
        borderTopWidth={1}
        bgColor="gray.50"
        paddingTop={5}
        paddingBottom={10}
      >
        <Container maxWidth="container.md">
          <Flex>
            <Input
              colorScheme="whatsapp"
              bgColor="white"
              placeholder={`${
                isOffline
                  ? "You're offline, but you can still queue a message..."
                  : "Send a message"
              }`}
              marginRight={2}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              disabled={isDisabled}
            />
            <IconButton
              colorScheme="whatsapp"
              aria-label="send"
              icon={<ArrowForwardIcon />}
              onClick={handleSubmit}
              disabled={isDisabled}
            />
          </Flex>
          <Text textAlign="center" fontSize="xs" marginTop={4}>
            Build Version: {process.env.REACT_APP_VERSION}
          </Text>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
