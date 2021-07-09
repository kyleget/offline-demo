import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@apollo/client";
import { Container, Progress, VStack } from "@chakra-ui/react";
import localforage from "localforage";
import { useEffect, useState } from "react";

import type { User } from "@auth0/auth0-spa-js";
import type { Message, OfflineCache } from "./types";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MessageBubble from "./components/MessageBubble";
import GetMessagesQuery from "./graphql/GetMessagesQuery";
import CreateMessageMutation from "./graphql/CreateMessageMutation";
import useAppUpdate from "./hooks/useAppUpdate";

const POLL_INTERVAL = 2000;
const CACHE_KEY_USER = "OFFLINE_CACHE_USER";
const CACHE_KEY_MESSAGES = "OFFLINE_CACHE_MESSAGES";
const CACHE_KEY_PENDING = "OFFLINE_CACHE_PENDING";

type Props = {
  isOffline: boolean;
};

const App = ({ isOffline }: Props) => {
  const {
    isLoading: userIsLoading,
    isAuthenticated,
    user: authenticatedUser,
    loginWithRedirect,
  } = useAuth0();
  const { updateAvailable } = useAppUpdate(isOffline);

  const [internalMessages, setInternalMessages] =
    useState<Message[] | undefined>(undefined);
  const [internalPendingMessages, setInternalPendingMessages] =
    useState<Message[] | undefined>(undefined);

  const [offlineCache, setOfflineCache] = useState<OfflineCache>({
    user: undefined,
    messages: undefined,
    pendingMessages: undefined,
  });

  const { data, startPolling, stopPolling } = useQuery(GetMessagesQuery, {
    skip: !isAuthenticated,
    pollInterval: POLL_INTERVAL,
  });

  // Determine whether to use server data or cached data
  const messages = internalMessages ?? offlineCache.messages;
  const pendingMessages =
    internalPendingMessages ?? offlineCache.pendingMessages;
  const user = authenticatedUser ?? offlineCache.user;

  const [createMessage] = useMutation(CreateMessageMutation);

  const handleSubmit = async (text: string) => {
    const now = new Date();
    setInternalPendingMessages((prevState) => [
      ...(prevState ?? []),
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
    if (isOffline) {
      Promise.all([
        localforage.getItem<User | undefined>(CACHE_KEY_USER),
        localforage.getItem<Message[]>(CACHE_KEY_MESSAGES),
        localforage.getItem<Message[]>(CACHE_KEY_PENDING),
      ]).then(([cachedUser, cachedMessages, cachedPendingMessages]) => {
        setOfflineCache({
          user: cachedUser ?? undefined,
          messages: cachedMessages ?? [],
          pendingMessages: cachedPendingMessages ?? [],
        });
      });
    }
  });

  useEffect(() => {
    if (data) {
      setInternalPendingMessages([]);
      setInternalMessages(data?.messages);
      localforage.setItem<Message[]>(CACHE_KEY_MESSAGES, data?.messages);
    }
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
    localforage.setItem<Message[] | undefined>(
      CACHE_KEY_PENDING,
      internalPendingMessages
    );
  }, [internalPendingMessages]);

  useEffect(() => {
    if (isOffline) {
      stopPolling();
      return;
    }
    startPolling(POLL_INTERVAL);
  }, [isOffline, startPolling, stopPolling]);

  useEffect(() => {
    if (authenticatedUser) {
      localforage.setItem<User | undefined>(CACHE_KEY_USER, authenticatedUser);
    }
  }, [authenticatedUser]);

  if (userIsLoading) {
    return <Progress size="xs" isIndeterminate />;
  }

  if (!isAuthenticated && !isOffline) {
    loginWithRedirect();
  }

  return (
    <>
      <Container maxWidth="container.md">
        <Header isOffline={isOffline} updateAvailable={updateAvailable} />
        <VStack spacing={3} align="stretch" paddingTop={20} paddingBottom={36}>
          {[...(messages ?? []), ...(pendingMessages ?? [])].map(
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
      <Footer
        isDisabled={!user}
        isOffline={isOffline}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default App;
