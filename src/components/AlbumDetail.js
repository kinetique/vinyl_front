import React, { useState, useEffect } from 'react';
import { albumsAPI } from '../services/api';
import '../App.css';

const AlbumDetail = ({ albumId, onBack }) => {
    const [album, setAlbum] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbumData = async () => {
            setLoading(true);
            setError(null);
            try {
                const albumData = await albumsAPI.getById(albumId);
                setAlbum(albumData);

                try {
                    const tracksData = await albumsAPI.getTracks(albumId);
                    setTracks(tracksData);
                } catch (err) {
                    console.log('Tracks not found');
                }
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };

        fetchAlbumData();
    }, [albumId]);

    if (loading) {
        return <div className="container"><div className="loading">Loading...</div></div>;
    }

    if (error) {
        return <div className="container"><div className="error">{error}</div></div>;
    }

    if (!album) {
        return null;
    }

    return (
        <div className="container">
            <button onClick={onBack} className="back-button">
                Back to albums
            </button>

            <div className="detail-card">
                <div className="detail-grid">
                    <div className="detail-image">
                        <div className="album-cover-large">
                            <div className="vinyl-icon-xlarge">♫</div>
                        </div>
                    </div>

                    <div className="detail-info">
                        <h2 className="detail-title">{album.title}</h2>
                        <p className="detail-artist">{album.artist}</p>

                        <div className="info-table">
                            <div className="info-row">
                                <span className="info-label">Label:</span>
                                <span className="info-value">{album.label}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Year:</span>
                                <span className="info-value">{album.year}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Genre:</span>
                                <span className="info-value">{album.genre}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Style:</span>
                                <span className="info-value">{album.style}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Available:</span>
                                <span className={`info-value ${album.available ? 'available' : 'unavailable'}`}>
                  {album.available ? 'Yes' : 'No'}
                </span>
                            </div>
                        </div>

                        <div className="detail-price">${album.price}</div>

                        {tracks && tracks.length > 0 && (
                            <div className="tracks-section">
                                <h3 className="tracks-title">Tracks:</h3>
                                <div className="tracks-list">
                                    {tracks.map((track, index) => (
                                        <div key={track.id} className="track-item">
                                            <span className="track-number">{index + 1}.</span>
                                            <span className="track-title">{track.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlbumDetail;