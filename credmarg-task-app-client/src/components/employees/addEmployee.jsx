import React, { useState } from 'react';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        designation: '',
        ctc: ''
    });

    const [errors, setErrors] = useState({});

    const validate = (name, value) => {
        const newErrors = { ...errors };

        switch (name) {
            case 'name':
                if (!value) {
                    newErrors.name = 'Name is required';
                } else if (value.length < 4) {
                    newErrors.name = 'Name must be at least 4 characters long';
                }
                else if (/\d/.test(value)) { // Check if there are any digits in the name
                    newErrors.name = 'Name must not contain numbers';
                }  else {
                    delete newErrors[name];
                }
                break;
            case 'email':
                if (!value) {
                    newErrors.email = 'Email is required';
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    newErrors.email = 'Email is invalid';
                } else {
                    delete newErrors[name];
                }
                break;
            case 'designation':
                if (!value) {
                    newErrors.designation = 'Designation is required';
                } else {
                    delete newErrors[name];
                }
                break;
            case 'ctc':
                if (!value) {
                    newErrors.ctc = 'CTC is required';
                } else if (isNaN(value)) {
                    newErrors.ctc = 'CTC must be a number';
                } else if (Number(value) < 500) {
                    newErrors.ctc = 'CTC must be greater than or equal to 500';
                } else {
                    delete newErrors[name];
                }
                break;
            default:
                break;
        }

        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors(validate(name, value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationErrors = Object.keys(formData).reduce((acc, key) => {
            return { ...acc, ...validate(key, formData[key]) };
        }, {});
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await UserService.addEmployee(formData, token);

            // Clear the form fields after successful registration
            setFormData({
                name: '',
                email: '',
                designation: '',
                ctc: ''
            });
            alert(response.message);
            console.log(response);
            navigate('/admin/employees');
        } catch (error) {
            console.error('Error registering employee:', error.response.data);

            const messages = Object.entries(error.response.data)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n');
            alert(messages);
        }
    };

    return (
        <div className="auth-container">
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.name && <span className="error" style={{color: 'red'}}>{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.email && <span className="error" style={{color: 'red'}}>{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label>Designation:</label>
                    <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Designation</option>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="HR Manager">HR Manager</option>
                        <option value="Sales Executive">Sales Executive</option>
                    </select>
                    {errors.designation && <span className="error" style={{color: 'red'}}>{errors.designation}</span>}
                </div>
                <div className="form-group">
                    <label>CTC:</label>
                    <input
                        type="text"
                        name="ctc"
                        value={formData.ctc}
                        onChange={handleInputChange}
                        placeholder="Enter CTC"
                        required
                    />
                    {errors.ctc && <span className="error" style={{color: 'red'}}>{errors.ctc}</span>}
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default AddEmployee;
