import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import axios from 'axios';
import Picture from '../assets/image/Picture.jpg';
import { Box, Flex, Grid, GridItem, Text, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { FaFileInvoiceDollar, FaChartLine } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [1200, 1900, 3000, 5000, 2000, 3200],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  let VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${VITE_BACKEND_URL}/api/transactions`);
        setRecentTransactions(res.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError('Failed to load transactions');
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);
  
  useEffect(() => {
    async function fetchPatient() {
      try {
        // Only fetch if there are transactions
        if (recentTransactions.length > 0) {
          const resPatient = await axios.get(`${VITE_BACKEND_URL}/api/transactions`);
          setSelectedPatient(resPatient.data);
          console.log(selectedPatient)
        }
      } catch (error) {
        console.log("Unable to fetch selected patient", error);
      }
    }

    fetchPatient();
  }, []); 

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`${VITE_BACKEND_URL}/api/patients`);
        setPatients(res.data);
        console.log("Patient data:", res.data);
      } catch (error) {
        console.log("Unable to fetch patient details", error);
      }
    };
  
    fetchPatients();
  }, []);
  

  
  return (
    <div
      className="dashboard-container"
      style={{
        backgroundImage: `url(${Picture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <div className="sidebar" style={{ height: '100%' }}>
        <Sidebar />
      </div>
      <div className="main-content" style={{ height: '100%' }}>
        <div className="header" style={{ height: 'auto' }}>
          <Header />
        </div>
        <div className="content" style={{ padding: '1rem', height: 'calc(100% - auto)' }}>
          <Text fontSize="2xl" mb={4} fontWeight="bold">Welcome to the Dashboard!</Text>

          <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={6}>
            {[
              { label: 'Total Patients', value: '20', bgColor: 'blue.50', hoverColor: 'blue.100' },
              { label: 'Appointments', value: '20', bgColor: 'green.50', hoverColor: 'green.100' },
              { label: 'Revenue', value: '$26000', bgColor: 'yellow.50', hoverColor: 'yellow.100' },
            ].map((item, index) => (
              <GridItem
                key={index}
                as={motion.div}
                bg={item.bgColor}
                p={4}
                borderRadius="md"
                boxShadow="md"
                whileHover={{ scale: 1.05, backgroundColor: item.hoverColor }}
                transition={{ duration: 0.3 }}
              >
                <Text fontSize="xl" mb={2}>{item.label}</Text>
                <Text fontSize="3xl" fontWeight="bold">{item.value}</Text>
              </GridItem>
            ))}
          </Grid>

          <Flex justify="space-between" align="center" mb={6}>
            <Button leftIcon={<FaFileInvoiceDollar />} colorScheme="teal" size="lg">
              Generate Report
            </Button>
            <Button leftIcon={<FaChartLine />} colorScheme="purple" size="lg">
              View Statistics
            </Button>
          </Flex>

          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <Box bg="white" p={6} borderRadius="md" boxShadow="lg" height="auto" maxHeight="400px" overflowY="scroll">
              <Text fontSize="xl" mb={4} color="teal.600" fontWeight="bold">Recent Transactions</Text>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th bg="blue.300" color="white">Patient ID</Th>
                    <Th bg="green.300" color="white">Surgery</Th>
                    <Th bg="purple.300" color="white">Patient</Th>
                    <Th bg="red.300" color="white" isNumeric>Amount</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {recentTransactions.map(transaction => (
                    <Tr key={transaction.id}>
                      <Td>{transaction.p_id}</Td>
                      <Td>{transaction.medicationDetails}</Td>
                      <Td>{patients.find((p) => p._id === transaction.p_id)?.patientName || 'Unknown'}</Td>
                      <Td isNumeric>{transaction.billAmount}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>

            <Box bg="white" p={6} borderRadius="md" boxShadow="lg" height="auto">
              <Text fontSize="xl" mb={4} color="purple.600" fontWeight="bold">Revenue Over Time</Text>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  style={{ height: '300px' }}
                >
                  <Bar data={chartData} options={chartOptions} />
                </motion.div>
              </AnimatePresence>
            </Box>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
