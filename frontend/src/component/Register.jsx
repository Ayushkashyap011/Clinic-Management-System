import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, Stack, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { FaSave, FaTrash, FaEdit, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', role: '', age: '', gender: '', password: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
  let VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAdmin = async () => {
    if (editIndex !== null) {
      const updatedAdmins = [...admins];
      updatedAdmins[editIndex] = form;
      setAdmins(updatedAdmins);
      setEditIndex(null);
    } else {
      try {
        await axios.post(`${VITE_BACKEND_URL}/api/admins`, form);
        setAdmins([...admins, form]);
        console.log(admins);
        setIsRegistered(true);
      } catch (error) {
        console.error('Error registering admin:', error);
      }
    }
    setForm({ name: '', email: '', role: '', age: '', gender: '', password: '' });
  };

  const handleEdit = (index) => {
    setForm(admins[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setAdmins(admins.filter((_, i) => i !== index));
  };

  const handleLoginRedirect = () => {
    navigate('/');
  };

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
      <Button
        leftIcon={<FaArrowLeft />}
        colorScheme="blue"
        size="sm"
        variant="outline"
        position="absolute"
        top="1rem"
        left="1rem"
        onClick={() => navigate('/dashboard')} 
      >
        Back
      </Button>
      <Box bg="teal.50" p={6} height="100%" overflowY="auto">
        <Text fontSize="2xl" mb={4} fontWeight="bold" textAlign="center">
          Register New Admin
        </Text>
        
        <Stack spacing={4} mb={6}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Enter admin name"
              bg="white"
              borderColor="gray.300"
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={form.email}
              onChange={handleInputChange}
              placeholder="Enter admin email"
              bg="white"
              borderColor="gray.300"
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="role">
            <FormLabel>Role</FormLabel>
            <Input
              name="role"
              value={form.role}
              onChange={handleInputChange}
              placeholder="Enter admin role"
              bg="white"
              borderColor="gray.300"
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="age">
            <FormLabel>Age</FormLabel>
            <Input
              name="age"
              type="number"
              value={form.age}
              onChange={handleInputChange}
              placeholder="Enter admin age"
              bg="white"
              borderColor="gray.300"
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <FormControl id="gender">
            <FormLabel>Gender</FormLabel>
            <Select
              name="gender"
              value={form.gender}
              onChange={handleInputChange}
              bg="white"
              borderColor="gray.300"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Other">Other</option>
            </Select>
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleInputChange}
              placeholder="Enter admin password"
              bg="white"
              borderColor="gray.300"
              _placeholder={{ color: 'gray.500' }}
            />
          </FormControl>
          <Button
            leftIcon={editIndex !== null ? <FaEdit /> : <FaSave />}
            colorScheme="teal"
            onClick={handleAddAdmin}
          >
            {editIndex !== null ? 'Update Admin' : 'Add Admin'}
          </Button>
          {isRegistered && (
            <Stack spacing={4} mt={4}>
              <Text color="green.500">Admin has been successfully registered!</Text>
              <Button colorScheme="blue" onClick={handleLoginRedirect}>
                Go to Login
              </Button>
            </Stack>
          )}
        </Stack>

        <Box bg="white" p={4} borderRadius="md" boxShadow="lg">
          <Text fontSize="xl" mb={4}>Admin List</Text>
          <Table variant="simple">
            <Thead bg="teal.100">
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Age</Th>
                <Th>Gender</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {admins.map((admin, index) => (
                <Tr key={index}>
                  <Td>{admin.name}</Td>
                  <Td>{admin.email}</Td>
                  <Td>{admin.role}</Td>
                  <Td>{admin.age}</Td>
                  <Td>{admin.gender}</Td>
                  <Td>
                    <Button
                      leftIcon={<FaEdit />}
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleEdit(index)}
                      mr={2}
                    >
                      Edit
                    </Button>
                    <Button
                      leftIcon={<FaTrash />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
