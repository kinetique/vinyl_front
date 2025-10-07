import React from 'react';
import '../App.css';

const Header = ({ currentView, onNavigate }) => {
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
                </nav>
            </div>
        </header>
    );
};

export default Header;