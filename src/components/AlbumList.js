import React, { useState, useEffect } from 'react';
import { albumsAPI } from '../services/api';
import '../App.css';

const AlbumList = ({ onSelectAlbum }) => {
    const [albums, setAlbums] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAlbums = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await albumsAPI.getAll(searchQuery, sortBy);
            setAlbums(data);
        } catch (err) {
            setError(err.message);
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAlbums();
    }, [sortBy]);

    const handleSearch = () => {
        fetchAlbums();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="container">
            <div className="search-section">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by title, artist, genre..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="search-input"
                    />
                    <button onClick={handleSearch} className="search-button">
                        Search
                    </button>
                </div>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                >
                    <option value="">Sorting</option>
                    <option value="price_asc">Price: ascending</option>
                    <option value="price_desc">Price: descending</option>
                    <option value="popularity">Popularity</option>
                    <option value="genre">Genre</option>
                    <option value="release_date_asc">Release date: ascending</option>
                    <option value="release_date_desc">Release date: descending</option>
                </select>
            </div>

            {/* Albums Grid */}
            {loading ? (
                <div className="loading">Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : albums.length === 0 ? (
                <div className="no-data">Albums not found</div>
            ) : (
                <div className="grid">
                    {albums.map((album) => (
                        <div
                            key={album.id}
                            onClick={() => onSelectAlbum(album.id)}
                            className="card album-card"
                        >
                            <div className="album-cover">
                                <div className="vinyl-icon-large">♫</div>
                            </div>
                            <h3 className="card-title">{album.title}</h3>
                            <p className="card-artist">{album.artist}</p>
                            <div className="card-footer">
                                <span className="genre-badge">{album.genre}</span>
                                <span className="price">${album.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AlbumList;