import React, { useEffect, useState } from "react";
import "./AlbumList.css";

function AlbumList({ onAlbumClick }) {
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/albums/")
            .then((res) => {
                if (!res.ok) throw new Error("Network error: " + res.status);
                return res.json();
            })
            .then((data) => setAlbums(data))
            .catch((err) => {
                console.error(err);
                setError(err.message);
            });
    }, []);

    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="albums-section">
            <h2>Albums</h2>
            {albums.length === 0 ? (
                <p>No albums found.</p>
            ) : (
                <ul className="album-list">
                    {albums.map((album) => (
                        <li
                            key={album.id}
                            className="album-item"
                            onClick={() => onAlbumClick && onAlbumClick(album.id)}
                        >
                            <strong>{album.title}</strong> by {album.artist} (${album.price})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AlbumList;
