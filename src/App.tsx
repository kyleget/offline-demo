import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@apollo/client";
import { Center, Container, Spinner, VStack } from "@chakra-ui/react";
import { useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import SignInScreen from "./components/SignInScreen";
import Message from "./components/Message";
import GetMessagesQuery from "./graphql/GetMessagesQuery";
import CreateMessageMutation from "./graphql/CreateMessageMutation";

type Message = {
  created_at: string;
  text: string;
  user: {
    auth0_id: string;
    name: string;
  };
};

const App = () => {
  const { isLoading, isAuthenticated, user } = useAuth0();

  const { data } = useQuery(GetMessagesQuery, {
    skip: !isAuthenticated,
    pollInterval: 5000,
  });

  const [createMessage] = useMutation(CreateMessageMutation);

  const handleSubmit = async (text: string) => {
    await createMessage({
      variables: {
        text,
      },
    });
  };

  useEffect(() => {
    if (data) {
      window.scrollTo(0,document.body.scrollHeight);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Center>
        <Spinner colorScheme="blue" thickness="3px" size="xl" mt={36} />
      </Center>
    );
  }

  if (!isAuthenticated) {
    return <SignInScreen />;
  }

  return (
    <>
      <Container maxWidth="container.md">
        <Header />
        <VStack spacing={3} align="stretch" paddingTop={20} paddingBottom={36}>
          {(data?.messages ?? []).map((message: Message) => (
            <Message
              text={message.text}
              date={new Date(message.created_at)}
              name={message.user.name}
              isSelf={message.user.auth0_id === user?.sub}
            />
          ))}
        </VStack>
      </Container>
      <Footer onSubmit={handleSubmit} />
    </>
  );
};

export default App;
