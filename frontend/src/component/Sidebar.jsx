import React from 'react';
import { VStack, Button, Icon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaStethoscope, FaPrescriptionBottle, FaFileInvoiceDollar, FaVirus, FaExchangeAlt } from 'react-icons/fa';
import './Sidebar.css'; 

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    console.log(`Navigating to ${path} page`);
    navigate(path);
  };

  return (
    <VStack 
      spacing={4} 
      align="start" 
      p={4} 
      className="sidebar"
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}
    >
      <Button 
        leftIcon={<Icon as={FaUser} />} 
        className="sidebar-button" 
        onClick={() => handleNavigation("/patient")}
        _hover={{ bg: 'teal.400', color: 'white' }}
        width="100%"
      >
        Patient
      </Button>
      <Button 
        leftIcon={<Icon as={FaStethoscope} />} 
        className="sidebar-button" 
        onClick={() => handleNavigation("/doctor")}
        _hover={{ bg: 'green.400', color: 'white' }}
        width="100%"
      >
        Doctor
      </Button>
      <Button 
        leftIcon={<Icon as={FaPrescriptionBottle} />} 
        className="sidebar-button" 
        onClick={() => handleNavigation("/prescription")}
        _hover={{ bg: 'blue.400', color: 'white' }}
        width="100%"
      >
        Prescription
      </Button>
      <Button 
        leftIcon={<Icon as={FaFileInvoiceDollar} />} 
        className="sidebar-button" 
        onClick={() => handleNavigation("/billing")}
        _hover={{ bg: 'purple.400', color: 'white' }}
        width="100%"
      >
        Billing
      </Button>
      <Button 
        leftIcon={<Icon as={FaVirus} />} 
        className="sidebar-button" 
        onClick={() => handleNavigation("/disease")}
        _hover={{ bg: 'red.400', color: 'white' }}
        width="100%"
      >
        Disease
      </Button>
      <Button 
        leftIcon={<Icon as={FaExchangeAlt} />} 
        className="sidebar-button" 
        onClick={() => handleNavigation("/transaction")}
        _hover={{ bg: 'orange.400', color: 'white' }}
        width="100%"
      >
        Transaction
      </Button>
    </VStack>
  );
};

export default Sidebar;
