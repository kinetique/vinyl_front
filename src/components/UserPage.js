import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import EditProfile from './EditProfile';
import './Auth.css';

const UserProfile = () => {
    const { user, setUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdateSuccess = (updatedData) => {
        setUser(updatedData);
    };

    if (isEditing) {
        return (
            <EditProfile
                onBack={() => setIsEditing(false)}
                onSuccess={handleUpdateSuccess}
            />
        );
    }

    return (
        <div className="auth-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <h2>Welcome, {user?.username}!</h2>
                    <p className="profile-subtitle">Your personal vinyl collection space</p>
                </div>

                <div className="profile-info">
                    <div className="info-section">
                        <h3>Account Information</h3>

                        <div className="info-item">
                            <span className="info-label">Username:</span>
                            <span className="info-value">{user?.username}</span>
                        </div>

                        <div className="info-item">
                            <span className="info-label">Email:</span>
                            <span className="info-value">{user?.email}</span>
                        </div>
                    </div>

                    <div className="info-section">
                        <h3>Exclusive Features</h3>
                        <ul className="features-list">
                            <li>✓ Browse complete vinyl catalog</li>
                            <li>✓ View detailed album information</li>
                            <li>✓ Explore artists and labels</li>
                            <li>✓ Write and read album reviews</li>
                        </ul>
                    </div>
                </div>

                <div className="profile-actions">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="profile-button secondary"
                    >
                        Edit Profile
                    </button>
                    <button className="profile-button secondary">
                        Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;