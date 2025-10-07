import React, { useEffect, useState } from "react";
import "./AlbumDetail.css";

function AlbumDetail({ albumId }) {
    const [album, setAlbum] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [error, setError] = useState(null);

    // Отримуємо деталі альбому
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/albums/${albumId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Album not found");
                return res.json();
            })
            .then((data) => setAlbum(data))
            .catch((err) => setError(err.message));
    }, [albumId]);

    // Отримуємо треки
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/albums/${albumId}/tracks`)
            .then((res) => {
                if (!res.ok) throw new Error("Tracks not found");
                return res.json();
            })
            .then((data) => setTracks(data))
            .catch((err) => console.error(err));
    }, [albumId]);

    if (error) return <div className="error">Error: {error}</div>;
    if (!album) return <p>Loading album details...</p>;

    return (
        <div className="album-detail">
            <h2>{album.title}</h2>
            <p><strong>Artist:</strong> {album.artist}</p>
            <p><strong>Label:</strong> {album.label}</p>
            <p><strong>Year:</strong> {album.year}</p>
            <p><strong>Genre:</strong> {album.genre}</p>
            <p><strong>Style:</strong> {album.style}</p>
            <p><strong>Price:</strong> ${album.price}</p>
            <p><strong>Available:</strong> {album.available ? "Yes" : "No"}</p>

            <h3>Tracks:</h3>
            <ul>
                {tracks.map((track) => (
                    <li key={track.id}>{track.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default AlbumDetail;
