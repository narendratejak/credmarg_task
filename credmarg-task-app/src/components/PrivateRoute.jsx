// PrivateRoute.js
// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const PrivateRoute = () => {
    const { authenticated } = useContext(AuthContext);
    console.log("Authentication Status");
    console.log(authenticated);
    return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

