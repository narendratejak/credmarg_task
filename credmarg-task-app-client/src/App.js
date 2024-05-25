// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';

import UserService from './components/service/UserService';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';
import ProfilePage from './components/userspage/ProfilePage';
import Layout from './Layout';
import EmployeeManageent from './components/employees/EmployeeManageent';
import AddEmployee from './components/employees/addEmployee';
import VendorsManageent from './components/Vendors/VendorsManageent';
import AddVendors from './components/Vendors/AddVendors';
import { AuthProvider } from './components/context/AuthContext';
import PrivateRoute from './components/PrivateRoute';





function App() {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated on component mount
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
  }, [authenticated]);

  return (
    <AuthProvider>
    <BrowserRouter>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="" element={<LoginPage />} />
              
              <Route element={<PrivateRoute />}>
                <Route path="/admin/register" element={<RegistrationPage />} />
                <Route path="/admin/profile" element={<ProfilePage />} />
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/admin/update-user/:userId" element={<UpdateUser />} />
                <Route path="/admin/employees" element={<EmployeeManageent />} />
                <Route path="/admin/addEmployee" element={<AddEmployee />} />
                <Route path="/admin/vendors" element={<VendorsManageent />} />
                <Route path="/admin/addVendor" element={<AddVendors />} />
              </Route>
              <Route path="*" element={<Navigate to="/login" />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </AuthProvider>

  );
}

export default App;
