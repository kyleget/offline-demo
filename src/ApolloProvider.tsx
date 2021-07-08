import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import {
  ApolloClient,
  createHttpLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Provider = ({ children }: Props) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const link = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL,
  });

  const authLink = setContext(async (_, { headers }) => {
    const accessToken = await getAccessTokenSilently();
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache({}),
  });

  return isAuthenticated ? (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  ) : null;
};

export default withAuthenticationRequired(Provider);
