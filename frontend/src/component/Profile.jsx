import React from 'react';
import { Box, Text, Stack, Avatar, FormControl, FormLabel, Input, Select, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; 

const Profile = () => {
  const navigate = useNavigate(); 

  const admin = {
    name: 'Ayush Kashyap',
    email: 'ayush@gmail.com',
    role: 'administrator',
    age: 21,
    gender: 'Male'
  };

  const handleBackClick = () => {
    navigate('/dashboard'); 
  };

  return (
    <Box
      p={6}
      bg="teal.50"
      height="100vh"
      width="100vw"
      overflowY="auto"
    >
      <Button 
        onClick={handleBackClick}
        position="fixed"
        top={4}
        left={4}
        colorScheme="teal"
        variant="solid"
        size="sm"
      >
        Back
      </Button>

      <Text 
        fontSize="2xl" 
        mb={4} 
        fontWeight="bold" 
        textAlign="center"
      >
        Admin Profile
      </Text>
      
      <Stack spacing={4} maxW="md" margin="0 auto">
        <Avatar size="xl" name={admin.name} src="https://bit.ly/broken-link" mb={4} />
        
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input value={admin.name} isReadOnly />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input value={admin.email} isReadOnly />
        </FormControl>
        <FormControl id="role">
          <FormLabel>Role</FormLabel>
          <Input value={admin.role} isReadOnly />
        </FormControl>
        <FormControl id="age">
          <FormLabel>Age</FormLabel>
          <Input value={admin.age} isReadOnly />
        </FormControl>
        <FormControl id="gender">
          <FormLabel>Gender</FormLabel>
          <Select value={admin.gender} isReadOnly>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>

        <Button colorScheme="teal" mt={4}>Edit Profile</Button>
      </Stack>
    </Box>
  );
};

export default Profile;
