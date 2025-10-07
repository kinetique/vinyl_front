import React, { useState, useEffect } from 'react';
import { artistsAPI } from '../services/api';
import '../App.css';

const ArtistList = ({ onSelectArtist }) => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtists = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await artistsAPI.getAll();
                setArtists(data);
            } catch (err) {
                setError(err.message);
                console.error(err);
            }
            setLoading(false);
        };

        fetchArtists();
    }, []);

    return (
        <div className="container">
            <h2 className="page-title">Artists</h2>

            {loading ? (
                <div className="loading">Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : artists.length === 0 ? (
                <div className="no-data">Artists not found</div>
            ) : (
                <div className="grid">
                    {artists.map((artist) => (
                        <div
                            key={artist.id}
                            onClick={() => onSelectArtist(artist.id)}
                            className="card artist-card"
                        >
                            <div className="artist-avatar">
                                <span className="avatar-icon">👤</span>
                            </div>
                            <h3 className="card-title">{artist.name}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArtistList;