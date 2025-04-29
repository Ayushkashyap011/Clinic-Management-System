import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Patient from './Patient';
import Doctor from './Doctor';
import Prescription from './Prescription';
import Billing from './Billing';
import Disease from './Disease';
import Transaction from './Transaction';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
//import UserContext from '../context/UserContext';

const AllRoutes = () => {
  // const { protect } = useContext(UserContext);
  // console.log(protect)

  return (
   /* <div>
      <Routes>
      
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {protect ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patient" element={<Patient />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/prescription" element={<Prescription />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/disease" element={<Disease />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </div>*/

    <div>
    <Routes>
    
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/prescription" element={<Prescription />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/disease" element={<Disease />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/profile" element={<Profile />} />

    </Routes>
  </div>
  );
};

export default AllRoutes;
