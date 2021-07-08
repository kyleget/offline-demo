import { Box, Flex, Text } from "@chakra-ui/react";
import { TimeIcon, CheckIcon } from "@chakra-ui/icons";
import { format } from "date-fns";

type Props = {
  text: string;
  date: Date;
  name: string;
  isSelf?: Boolean;
  pending?: Boolean;
};

const MessageBubble = ({ text, date, name, isSelf = false, pending = false }: Props) => {
  return (
    <Flex flexDirection={isSelf ? "row-reverse" : "row"}>
      <Box
        backgroundColor={isSelf ? "whatsapp.50" : "blue.50"}
        borderColor={isSelf ? "whatsapp.100" : "blue.100"}
        borderWidth={1}
        borderRadius={10}
        padding={2}
        maxWidth="70%"
        minWidth="25%"
      >
        <Text>
          <b>
            {name}
          </b>
          <br />
          {text}
        </Text>
        <Text color="gray.500" fontSize="smaller" align="end">
          {format(date, "M/d/yyyy h:mmaaa")}
          {isSelf && (
            <>
              {pending ? (
                <TimeIcon marginLeft={2} color="orange.400" />
              ) : (
                <CheckIcon marginLeft={2} color="whatsapp.500" />
              )}
            </>
          )}
        </Text>
      </Box>
    </Flex>
  );
};

export default MessageBubble;
