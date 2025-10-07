import React, { useState } from 'react';
import Header from './components/Header';
import AlbumList from './components/AlbumList';
import AlbumDetail from './components/AlbumDetail';
import ArtistList from './components/ArtistList';
import ArtistDetail from './components/ArtistDetail';
import LabelList from './components/LabelList';
import LabelDetail from './components/LabelDetail';
import './App.css';

function App() {
    const [view, setView] = useState('albums');
    const [selectedId, setSelectedId] = useState(null);

    const handleNavigate = (newView) => {
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

    return (
        <div className="App">
            <Header currentView={view} onNavigate={handleNavigate} />

            <main>
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

export default App;