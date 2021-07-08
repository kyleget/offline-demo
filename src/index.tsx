import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider } from "@chakra-ui/react";

import ApolloProvider from "./ApolloProvider";
import * as serviceWorkerRegistration from "./sw/serviceWorkerRegistration";

import App from "./App";

const Root = () => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ""}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ""}
      redirectUri={window.location.origin}
      audience="hasura"
    >
      <ApolloProvider>
        <ChakraProvider>
          <React.StrictMode>
            <App />
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
serviceWorkerRegistration.register();
