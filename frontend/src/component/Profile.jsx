import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Stack,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    age: '',
    gender: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setAdmin(parsedUser);
      setFormData(parsedUser);
    } else {
      navigate("/login");
    }
  }, []);

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    localStorage.setItem("user", JSON.stringify(formData));
    setAdmin(formData);
    setIsEditing(false);
  };

  if (!admin) return null;

  return (
    <Box p={6} bg="teal.50" height="100vh" width="100vw" overflowY="auto">
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

      <Text fontSize="2xl" mb={4} fontWeight="bold" textAlign="center">
        Admin Profile
      </Text>

      <Stack spacing={4} maxW="md" margin="0 auto">
        <Avatar size="xl" name={formData.name} src="https://bit.ly/broken-link" mb={4} />

        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={formData.name}
            isReadOnly={!isEditing}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            value={formData.email}
            isReadOnly
          />
        </FormControl>

        <FormControl id="role">
          <FormLabel>Role</FormLabel>
          <Input
            name="role"
            value={formData.role}
            isReadOnly={!isEditing}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="age">
          <FormLabel>Age</FormLabel>
          <Input
            name="age"
            type="number"
            value={formData.age}
            isReadOnly={!isEditing}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="gender">
          <FormLabel>Gender</FormLabel>
          <Select
            name="gender"
            value={formData.gender}
            isReadOnly={!isEditing}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>

        {!isEditing ? (
          <Button colorScheme="teal" mt={4} onClick={handleEditClick}>
            Edit Profile
          </Button>
        ) : (
          <Button colorScheme="green" mt={4} onClick={handleSaveClick}>
            Save Changes
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default Profile;
