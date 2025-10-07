import React, { useEffect, useState } from "react";
import "./AlbumList.css"; // для стилів

function AlbumList({ onAlbumClick }) {
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/albums/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network error: " + response.status);
                }
                return response.json();
            })
            .then((data) => setAlbums(data))
            .catch((error) => {
                console.error("Error fetching albums:", error);
                setError(error.message);
            });
    }, []);

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="albums-section">
            <h1>Albums</h1>
            {albums.length === 0 ? (
                <p>No albums found.</p>
            ) : (
                <ul className="album-list">
                    {albums.map((album) => (
                        <li
                            key={album.id}
                            className="album-item"
                            onClick={() => onAlbumClick && onAlbumClick(album.id)}
                            style={{ cursor: "pointer" }}
                        >
                            <span className="album-title">{album.title}</span>{" "}
                            <span className="album-artist">by {album.artist}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AlbumList;
