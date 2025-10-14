import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const Header = ({ currentView, onNavigate }) => {
    const { user, logout, isAuthenticated } = useAuth();

    const handleLogout = async () => {
        await logout();
        onNavigate('public');
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-title-section">
                    <div className="vinyl-icon">♫</div>
                    <div>
                        <h1 className="site-title">VINYL SHOP</h1>
                        <p className="site-subtitle">vintage records collection</p>
                    </div>
                </div>

                <nav className="nav-buttons">
                    <button
                        onClick={() => onNavigate('albums')}
                        className={`nav-button ${currentView === 'albums' || currentView === 'album-detail' ? 'active' : ''}`}
                    >
                        Albums
                    </button>
                    <button
                        onClick={() => onNavigate('artists')}
                        className={`nav-button ${currentView === 'artists' || currentView === 'artist-detail' ? 'active' : ''}`}
                    >
                        Artists
                    </button>
                    <button
                        onClick={() => onNavigate('labels')}
                        className={`nav-button ${currentView === 'labels' || currentView === 'label-detail' ? 'active' : ''}`}
                    >
                        Labels
                    </button>

                    {isAuthenticated ? (
                        <>
                            <button
                                onClick={() => onNavigate('profile')}
                                className={`nav-button ${currentView === 'profile' ? 'active' : ''}`}
                            >
                                👤 {user?.username}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="nav-button logout-btn"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => onNavigate('login')}
                                className={`nav-button ${currentView === 'login' ? 'active' : ''}`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => onNavigate('register')}
                                className={`nav-button register-btn ${currentView === 'register' ? 'active' : ''}`}
                            >
                                Register
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;