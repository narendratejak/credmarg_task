import React, { useState } from 'react';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';

function AddVendors() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        upi: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear the error message when the user starts typing again
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields before submission
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            // Call the addVendor method from UserService
            const token = localStorage.getItem('token');
            await UserService.addVendor(formData, token);

            // Clear the form fields after successful registration
            setFormData({
                name: '',
                email: '',
                upi: ''
            });
            alert('Vendor added successfully');
            navigate('/admin/vendors');

        } catch (error) {
            console.error('Error adding vendor:', error);
            alert('An error occurred while adding vendor');
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
        if (!data.upi) {
            errors.upi = 'UPI is required';
        }

        return errors;
    };

    return (
        <div className="auth-container">
            <h2>Add Vendor</h2>
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
                    <label>UPI:</label>
                    <input type="text" name="upi" value={formData.upi} onChange={handleInputChange} required />
                    {errors.upi && <span className="error">{errors.upi}</span>}
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddVendors;
