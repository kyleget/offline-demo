import { Box, Flex, Text } from "@chakra-ui/react";
import { TimeIcon, CheckIcon } from "@chakra-ui/icons";
import { format } from "date-fns";

type User = {
  firstName: string;
  lastName: string;
};

type Props = {
  message: string;
  date: Date;
  user: User;
  pending?: Boolean;
};

const Message = ({ message, date, user, pending = false }: Props) => {
  const isSelf = user.firstName === "Kyle" && user.lastName === "Getrost";

  return (
    <Flex flexDirection={isSelf ? "row-reverse" : "row"}>
      <Text>{}</Text>
      <Box
        backgroundColor={isSelf ? "whatsapp.50" : "blue.50"}
        borderColor={isSelf ? "whatsapp.100" : "blue.100"}
        borderWidth={1}
        borderRadius={10}
        padding={2}
        maxWidth="70%"
      >
        <Text>
          <b>
            {user.firstName} {user.lastName}
          </b>
          <br />
          {message}
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

export default Message;
