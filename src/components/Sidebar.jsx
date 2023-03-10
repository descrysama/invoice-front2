
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Image
} from '@chakra-ui/react';

import { NavLink } from 'react-router-dom';

import {
  FiHome,
  FiBox,
  FiUser,
  FiFileText,
  FiFolder,
  FiMenu,
  FiTool,
  FiLayers,
  FiLogOut,
  FiInfo
} from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../app/stores/storeSlice';

const LinkItems = [
  { name: 'Accueil', icon: FiHome , route: '/dashboard'},
  { name: 'Catégories', icon: FiLayers, route: '/categories' },
  { name: 'Produits', icon: FiBox, route: '/products' },
  { name: 'Clients', icon: FiUser, route: '/customers' },
  { name: 'Réparations', icon: FiTool, route: '/repairs' },
  { name: 'Devis', icon: FiFileText, route: '/quotes' },
  { name: 'Factures', icon: FiFolder, route: '/invoices' },
  { name: 'Profile', icon: FiInfo, route: '/profile'}
];

export default function SideBar({ children }) {


  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
     <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const auth = useSelector(state => state.store);
  const dispatch = useDispatch();
  
  const LogoutFetch = () => {
    dispatch(logout());
  }

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex w={{ base: '100px', md: '150px', lg: '150px' }} alignItems="center" mx="10" my="8"  justifyContent="space-between">
        {auth.store.profilePicture ?
        <Image src={process.env.REACT_APP_API_URL + "/images/" + auth.store.profilePicture} alt='Store image' className='rounded-xl xs:w-5'/> : 
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold"  >
        InvoiceCRM
      </Text>}
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem onClick={onClose} key={link.name} icon={link.icon} href={link.route}>
          {link.name}
        </NavItem>
      ))}
        <Flex
            onClick={() => LogoutFetch()}
            align="center"
            p="4"
            mr="4"
            role="group"
            cursor="pointer"
            className='font-medium duration-300 rounded-r-full'
            _hover={{
              bg: '#fbecea',
              color: '#d34c31',
            }}>
            {FiLogOut && (
              <Icon
                mx="3"
                fontSize="16"
                _groupHover={{
                  color: '#d34c31',
                }}
                as={FiLogOut}
              />
            )}
            Deconnexion
          </Flex>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {


  return (
<NavLink to={rest.href} style={{ textDecoration: 'none' }}>
  <Flex
    align="center"
    p="4"
    mr="4"
    role="group"
    cursor="pointer"
    className='font-medium duration-300 rounded-r-full'
    _hover={{
      bg: '#eaf4fb',
      color: '#3187d3',
    }}
    {...rest}>
    {icon && (
      <Icon
        mx="3"
        fontSize="16"
        _groupHover={{
          color: '3187d3',
        }}
        as={icon}
      />
    )}
    {children}
  </Flex>
</NavLink>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const auth = useSelector(state => state.store);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

        {auth.store.profilePicture ?
        <Image src={process.env.REACT_APP_API_URL + "/images/" + auth.store.profilePicture} alt='Store image' w={10} marginLeft={2}/> : 
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" margin="30px">
        InvoiceCRM
      </Text>}
    </Flex>
  );
};