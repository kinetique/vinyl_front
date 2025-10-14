import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import AlbumList from './components/AlbumList';
import AlbumDetail from './components/AlbumDetail';
import ArtistList from './components/ArtistList';
import ArtistDetail from './components/ArtistDetail';
import LabelList from './components/LabelList';
import LabelDetail from './components/LabelDetail';
import Login from './components/Login';
import Register from './components/Register';
import UserPage from './components/UserPage';
import './App.css';

function AppContent() {
    const [view, setView] = useState('public');
    const [selectedId, setSelectedId] = useState(null);
    const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);
    const { isAuthenticated, loading } = useAuth();

    const protectedRoutes = ['profile'];

    const handleNavigate = (newView) => {
        if (protectedRoutes.includes(newView) && !isAuthenticated) {
            setRedirectAfterLogin(newView);
            setView('login');
            return;
        }

        if ((newView === 'login' || newView === 'register') && isAuthenticated) {
            setView('albums');
            return;
        }

        setView(newView);
        setSelectedId(null);
    };

    const handleSelectAlbum = (id) => {
        setSelectedId(id);
        setView('album-detail');
    };

    const handleSelectArtist = (id) => {
        setSelectedId(id);
        setView('artist-detail');
    };

    const handleSelectLabel = (id) => {
        setSelectedId(id);
        setView('label-detail');
    };

    const handleBackToAlbums = () => {
        setView('albums');
        setSelectedId(null);
    };

    const handleBackToArtists = () => {
        setView('artists');
        setSelectedId(null);
    };

    const handleBackToLabels = () => {
        setView('labels');
        setSelectedId(null);
    };

    if (loading) {
        return (
            <div className="App">
                <div className="loading-screen">
                    <div className="vinyl-icon-large">♫</div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="App">
            <Header currentView={view} onNavigate={handleNavigate} />
            <main>
                {view === 'public' && <AlbumList onSelectAlbum={handleSelectAlbum} />}
                {view === 'login' && (
                    <Login
                        onNavigate={handleNavigate}
                        redirectTo={redirectAfterLogin}
                    />
                )}
                {view === 'register' && <Register onNavigate={handleNavigate} />}
                {view === 'profile' && <UserPage />}
                {view === 'albums' && <AlbumList onSelectAlbum={handleSelectAlbum} />}
                {view === 'album-detail' && selectedId && (
                    <AlbumDetail albumId={selectedId} onBack={handleBackToAlbums} />
                )}
                {view === 'artists' && <ArtistList onSelectArtist={handleSelectArtist} />}
                {view === 'artist-detail' && selectedId && (
                    <ArtistDetail
                        artistId={selectedId}
                        onBack={handleBackToArtists}
                        onSelectAlbum={handleSelectAlbum}
                    />
                )}
                {view === 'labels' && <LabelList onSelectLabel={handleSelectLabel} />}
                {view === 'label-detail' && selectedId && (
                    <LabelDetail
                        labelId={selectedId}
                        onBack={handleBackToLabels}
                        onSelectAlbum={handleSelectAlbum}
                    />
                )}
            </main>
            <footer className="footer">
                <p>© 2025 VINYL SHOP - vintage records collection</p>
            </footer>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;