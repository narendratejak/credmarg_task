import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';

function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(UserService.isAuthenticated());
    const [isAdmin, setIsAdmin] = useState(UserService.isAdmin());
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Update state whenever the location changes
        setIsAuthenticated(UserService.isAuthenticated());
        setIsAdmin(UserService.isAdmin());
    }, [location]);

    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserService.logout();
            setIsAuthenticated(false);
            setIsAdmin(false);
            navigate('/'); // Redirect to home after logout
        }
    };

    return (
        <nav>
            <ul>
                {!isAuthenticated && <li><Link to="/">Credmarg</Link></li>}
                {isAuthenticated && <li><Link to="/admin/profile">Profile</Link></li>}
                {isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
                {isAdmin && <li><Link to="/admin/employees">Employees</Link></li>}
                {isAdmin && <li><Link to="/admin/vendors">Vendors</Link></li>}
                {isAuthenticated && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </nav>
    );
}

export default Navbar;
