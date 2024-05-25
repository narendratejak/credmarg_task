import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm({ email, password });
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const userData = await UserService.login(email, password);
                if (userData.token) {
                    localStorage.setItem('token', userData.token);
                    localStorage.setItem('role', userData.role);
                    await login(userData.token);
                    navigate('/admin/profile');
                } else {
                    setError(userData.message);
                }
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setTimeout(() => {
                    setError('');
                }, 5000);
            }
        }
    };

    const validateForm = (data) => {
        const errors = {};
        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email is invalid';
        }
        if (!data.password) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
