// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        // Check if user is already authenticated on component mount
         const token = localStorage.getItem('token');
        if (token) {

            localStorage.setItem("token", localStorage.getItem("token"));
            setAuthenticated(true);
        }

        
    
    }, [authenticated]);

    const login = (token) => {
        localStorage.setItem('token', token);
        setAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
