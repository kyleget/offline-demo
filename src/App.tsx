import { useAuth0 } from '@auth0/auth0-react';
import { Container, VStack } from "@chakra-ui/react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import SignInScreen from './components/SignInScreen';
import Message from "./components/Message";

const App = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <SignInScreen />
  }

  return (
    <>
      <Container maxWidth="container.md">
        <Header />
        <VStack spacing={3} align="stretch" paddingTop={20} paddingBottom={36}>
          <Message
            message="This is a test message."
            date={new Date()}
            user={{
              firstName: "Kyle",
              lastName: "Getrost",
            }}
          />
          <Message
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim iaculis vehicula. Curabitur ante tortor."
            date={new Date()}
            user={{
              firstName: "Kyle",
              lastName: "Getrost",
            }}
          />
          <Message
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non turpis ac sapien eleifend cursus. In et enim et diam tincidunt dignissim venenatis ut ipsum. Quisque faucibus ligula bibendum magna commodo varius. Nullam odio arcu."
            date={new Date()}
            user={{
              firstName: "Dave",
              lastName: "Johnson",
            }}
          />
          <Message
            message="This is a test message."
            date={new Date()}
            user={{
              firstName: "Kyle",
              lastName: "Getrost",
            }}
            pending
          />
          <Message
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim iaculis vehicula. Curabitur ante tortor."
            date={new Date()}
            user={{
              firstName: "Joe",
              lastName: "Smith",
            }}
          />
          <Message
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non turpis ac sapien eleifend cursus. In et enim et diam tincidunt dignissim venenatis ut ipsum. Quisque faucibus ligula bibendum magna commodo varius. Nullam odio arcu."
            date={new Date()}
            user={{
              firstName: "Dave",
              lastName: "Johnson",
            }}
          />
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default App;
