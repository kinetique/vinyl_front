import React, { useState, useEffect } from 'react';
import { artistsAPI } from '../services/api';
import '../App.css';

const ArtistDetail = ({ artistId, onBack, onSelectAlbum }) => {
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtistData = async () => {
            setLoading(true);
            setError(null);
            try {
                const artistData = await artistsAPI.getById(artistId);
                setArtist(artistData);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };

        fetchArtistData();
    }, [artistId]);

    if (loading) {
        return <div className="container"><div className="loading">Loading...</div></div>;
    }

    if (error) {
        return <div className="container"><div className="error">{error}</div></div>;
    }

    if (!artist) {
        return null;
    }

    return (
        <div className="container">
            <button onClick={onBack} className="back-button">
                Back to artists
            </button>

            <div className="detail-card">
                <div className="artist-detail-header">
                    <div className="artist-avatar-large">
                        <span className="avatar-icon-large">👤</span>
                    </div>
                    <h2 className="detail-title">{artist.name}</h2>
                </div>

                <h3 className="section-title">Albums:</h3>
                {artist.albums && artist.albums.length > 0 ? (
                    <div className="albums-grid">
                        {artist.albums.map((album) => (
                            <div
                                key={album.id}
                                onClick={() => onSelectAlbum(album.id)}
                                className="mini-album-card"
                            >
                                <div className="mini-album-cover">
                                    <div className="vinyl-icon-medium">♫</div>
                                </div>
                                <h4 className="mini-album-title">{album.title}</h4>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-data">Albums not found</div>
                )}
            </div>
        </div>
    );
};

export default ArtistDetail;