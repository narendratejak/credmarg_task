import React, { useState } from 'react';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '' // Updated initial state for role field
        
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear previous error message for this input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate form fields before submission
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            console.log('Validation errors:', validationErrors); // Add this line for debugging
            return;
        }
    
        try {
            // Call the register method from UserService
            const token = localStorage.getItem('token');
            await UserService.register(formData, token);
    
            // Clear the form fields after successful registration
            setFormData({
                name: '',
                email: '',
                password: '',
                role: ''
                
            });
            alert('User registered successfully');
            navigate('/admin/user-management');
    
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user');
        }
    };
    

    const validateForm = (data) => {
        const errors = {};
    
        // Validate each form field
        if (!data.name) {
            errors.name = 'Name is required';
        }
        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email is invalid';
        }
        if (!data.password) {
            errors.password = 'Password is required';
        } else if (data.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(data.password)) {
            errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        if (!data.role) {
            errors.role = 'Role is required';
        }
       
    
        console.log('Validation errors:', errors); // Add this line for debugging
    
        return errors;
    };
    

    return (
        <div className="auth-container">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="USER">USER</option>
                    </select>
                    {errors.role && <span className="error">{errors.role}</span>}
                </div>
               
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegistrationPage;
