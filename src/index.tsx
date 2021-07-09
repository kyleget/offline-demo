import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider, Progress } from "@chakra-ui/react";

import ApolloProvider from "./ApolloProvider";
import useOffline from "./hooks/useOffline";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from "./App";

const Root = () => {
  const { checkingNetworkStatus, isOffline } = useOffline();

  if (checkingNetworkStatus) {
    return (
      <ChakraProvider>
        <Progress size="xs" isIndeterminate />
      </ChakraProvider>
    );
  }

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ""}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ""}
      redirectUri={window.location.origin}
      audience="hasura"
    >
      <ApolloProvider isOffline={isOffline}>
        <ChakraProvider>
          <React.StrictMode>
            <App isOffline={isOffline} />
          </React.StrictMode>
        </ChakraProvider>
      </ApolloProvider>
    </Auth0Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
