import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {
  createHttpLink,
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from "@apollo/client/link/context";
import QueueLink from "apollo-link-queue";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Provider = ({ children }: Props) => {
  const { getAccessTokenSilently } = useAuth0();

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL,
  });

  const authLink = setContext(async (_, { headers }) => {
    const accessToken = await getAccessTokenSilently();
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

  const retryLink = new RetryLink();

  const queueLink = new QueueLink();

  window.addEventListener("online", () => queueLink.open());
  window.addEventListener("offline", () => queueLink.close());

  const client = new ApolloClient({
    cache: new InMemoryCache({}),
    link: ApolloLink.from([
      authLink,
      retryLink,
      queueLink,
      httpLink,
    ]),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
