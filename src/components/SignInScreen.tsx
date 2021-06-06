import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container } from "@chakra-ui/react";

const SignInScreen = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container maxWidth="container.sm">
      <Button onClick={loginWithRedirect}>Sign In</Button>
    </Container>
  );
};

export default SignInScreen;
