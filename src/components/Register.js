import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = ({ onNavigate }) => {
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_check: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { register } = useAuth();

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length > 150) {
            newErrors.username = 'Username must be less than 150 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase, lowercase, and number';
        }

        if (formData.password !== formData.password_check) {
            newErrors.password_check = 'Passwords do not match';
        }

        if (formData.first_name.length > 150) {
            newErrors.first_name = 'First name must be less than 150 characters';
        }
        if (formData.last_name.length > 150) {
            newErrors.last_name = 'Last name must be less than 150 characters';
        }

        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setErrors({});

        console.log('Form data being sent:', formData);

        const result = await register(formData);

        console.log('Registration result:', result);

        setLoading(false);

        if (result.success) {
            setSuccess(true);
            setTimeout(() => {
                onNavigate('login');
            }, 2000);
        } else {
            console.error('Registration errors:', result.errors);
            setErrors(result.errors);
        }
    };

    if (success) {
        return (
            <div className="auth-container">
                <div className="auth-card success-card">
                    <div className="success-icon">✓</div>
                    <h2>Registration Successful!</h2>
                    <p>Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="vinyl-icon-auth">♫</div>
                    <h2>Join VINYL SHOP</h2>
                    <p className="auth-subtitle">Start your vinyl collection journey</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="username">Username *</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            className={`auth-input ${errors.username ? 'error' : ''}`}
                            placeholder="Choose a username"
                            maxLength="150"
                        />
                        {errors.username && <span className="field-error">{errors.username}</span>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="auth-input"
                                placeholder="Optional"
                                maxLength="150"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                id="last_name"
                                name="last_name"
                                type="text"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="auth-input"
                                placeholder="Optional"
                                maxLength="150"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`auth-input ${errors.email ? 'error' : ''}`}
                            placeholder="your@email.com"
                        />
                        {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password *</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`auth-input ${errors.password ? 'error' : ''}`}
                            placeholder="At least 8 characters"
                        />
                        {errors.password && <span className="field-error">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password_check">Confirm Password *</label>
                        <input
                            id="password_check"
                            name="password_check"
                            type="password"
                            value={formData.password_check}
                            onChange={handleChange}
                            className={`auth-input ${errors.password_check ? 'error' : ''}`}
                            placeholder="Re-enter password"
                        />
                        {errors.password_check && <span className="field-error">{errors.password_check}</span>}
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account?</p>
                    <button
                        onClick={() => onNavigate('login')}
                        className="link-button"
                    >
                        Login here
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;