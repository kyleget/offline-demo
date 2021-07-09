import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@apollo/client";
import { Container, Progress, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import type { Message } from "./types";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MessageBubble from "./components/MessageBubble";
import GetMessagesQuery from "./graphql/GetMessagesQuery";
import CreateMessageMutation from "./graphql/CreateMessageMutation";
import useAppUpdate from "./hooks/useAppUpdate";

const POLL_INTERVAL = 1000;

type Props = {
  isOffline: boolean;
};

const App = ({ isOffline }: Props) => {
  const {
    isLoading: userIsLoading,
    isAuthenticated,
    user,
    loginWithRedirect,
  } = useAuth0();
  const { updateAvailable } = useAppUpdate(isOffline);
  const [pendingMessages, setPendingMessages] = useState<Message[]>([]);

  const { data, startPolling, stopPolling } = useQuery(GetMessagesQuery, {
    skip: !isAuthenticated,
    pollInterval: POLL_INTERVAL,
  });

  const [createMessage] = useMutation(CreateMessageMutation);

  const handleSubmit = async (text: string) => {
    const now = new Date();
    setPendingMessages((prevState) => [
      ...prevState,
      {
        id: now.getTime(),
        created_at: now.toISOString(),
        text,
        pending: true,
        user: {
          name: user?.name ?? "",
          auth0_id: user?.sub ?? "",
        },
      },
    ]);

    await createMessage({
      variables: {
        text,
      },
    });
  };

  useEffect(() => {
    setPendingMessages([]);
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [pendingMessages]);

  useEffect(() => {
    if (isOffline) {
      stopPolling();
      return;
    }
    startPolling(POLL_INTERVAL);
  }, [isOffline, startPolling, stopPolling]);

  if (userIsLoading) {
    return (
      <Progress size="xs" isIndeterminate />
    );
  }

  if (!isAuthenticated && !isOffline) {
    loginWithRedirect();
  }

  return (
    <>
      <Container maxWidth="container.md">
        <Header isOffline={isOffline} updateAvailable={updateAvailable} />
        <VStack spacing={3} align="stretch" paddingTop={20} paddingBottom={36}>
          {[...(data?.messages ?? []), ...pendingMessages].map(
            (message: Message) => (
              <MessageBubble
                key={message.id}
                text={message.text}
                date={new Date(message.created_at)}
                name={message.user.name}
                isSelf={message.user.auth0_id === user?.sub}
                pending={message.pending}
              />
            )
          )}
        </VStack>
      </Container>
      <Footer isOffline={isOffline} onSubmit={handleSubmit} />
    </>
  );
};

export default App;
