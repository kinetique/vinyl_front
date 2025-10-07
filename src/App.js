import React, { useState } from "react";
import AlbumList from "./components/AlbumList";
import AlbumDetail from "./components/AlbumDetail";
import ArtistList from "./components/ArtistList";
import LabelList from "./components/LabelList";
import "./App.css";

function App() {
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);

    const handleAlbumClick = (id) => {
        setSelectedAlbumId(id);
    };

    return (
        <div className="App">
            <header>
                <h1>Vinyl Shop</h1>
            </header>

            {/* Список альбомів */}
            <AlbumList onAlbumClick={handleAlbumClick} />

            {/* Деталі обраного альбому */}
            {selectedAlbumId && <AlbumDetail albumId={selectedAlbumId} />}

            <ArtistList />
            <LabelList />
        </div>
    );
}

export default App;
