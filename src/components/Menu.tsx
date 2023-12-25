import { useAuth0 } from '@auth0/auth0-react';
import {
  Menu as ChakraMenu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Menu = () => {
  const { logout } = useAuth0();

  return (
    <ChakraMenu>
      <MenuButton
        as={IconButton}
        bgColor="white"
        size="md"
        aria-label="Menu"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem
          onClick={() =>
            logout({
              logoutParams: {
                returnTo: window.location.origin,
              },
            })
          }
        >
          Sign Out
        </MenuItem>
      </MenuList>
    </ChakraMenu>
  );
};

export default Menu;
