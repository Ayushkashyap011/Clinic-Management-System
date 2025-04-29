import React from 'react';
import { Box, Button, Text, Avatar, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };
  let VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const handleProfile = () => {
    const admin = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'Administrator',
      age: '30',
      gender: 'Male',
    };
    navigate('/profile', { state: { admin } });
  };

  const handleAddAdmin = () => {
    navigate('/register');
  };

  return (
    <Box
      p={4}
      bg="teal.500"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="md"
      position="relative"
      zIndex={1}
    >
      <Text fontSize="xl" fontWeight="bold">
        Clinic Management Dashboard
      </Text>

      <Box display="flex" alignItems="center">
        <Button
          colorScheme="blue"
          bg="blue.500"
          _hover={{ bg: 'blue.600' }}
          onClick={handleAddAdmin}
          mr={4}
          size="md"
          paddingX={6}
          borderRadius="md"
        >
          Add New Admin
        </Button>

        <IconButton
          icon={<FaBell />}
          variant="solid"
          colorScheme="orange"
          aria-label="Notifications"
          mr={4}
          _hover={{ bg: 'orange.600', color: 'white' }}
        />

        <Menu>
          <MenuButton 
            as={Button} 
            colorScheme="purple"
            rightIcon={<FaUserCircle />}
            _hover={{ bg: 'purple.600' }}
          >
            Profile
          </MenuButton>
          <MenuList bg="gray.800" color="white">
            <MenuItem 
              onClick={handleProfile} 
              _hover={{ bg: 'purple.600' }}
              bg="purple.500"
              size="sm"
            >
              View Profile
            </MenuItem>
            <MenuItem 
              onClick={handleLogout} 
              _hover={{ bg: 'purple.600' }}
              bg="purple.500"
              size="sm" 
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>

        <Avatar
          ml={4}
          size="md"
          name="John Doe"
          src="https://bit.ly/broken-link"
        />
      </Box>
    </Box>
  );
};

export default Header;
