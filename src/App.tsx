import {
  ChakraProvider,
  Container,
  VStack,
  theme,
} from "@chakra-ui/react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Message from "./components/Message";

const App = () => (
  <ChakraProvider theme={theme}>
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
  </ChakraProvider>
);

export default App;
