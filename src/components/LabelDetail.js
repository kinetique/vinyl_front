import React, { useState, useEffect } from 'react';
import { labelsAPI } from '../services/api';
import '../App.css';

const LabelDetail = ({ labelId, onBack, onSelectAlbum }) => {
    const [label, setLabel] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLabelData = async () => {
            setLoading(true);
            setError(null);
            try {
                const labelData = await labelsAPI.getById(labelId);
                setLabel(labelData);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };

        fetchLabelData();
    }, [labelId]);

    if (loading) {
        return <div className="container"><div className="loading">Loading...</div></div>;
    }

    if (error) {
        return <div className="container"><div className="error">{error}</div></div>;
    }

    if (!label) {
        return null;
    }

    return (
        <div className="container">
            <button onClick={onBack} className="back-button">
                Back to labels
            </button>

            <div className="detail-card">
                <div className="label-detail-header">
                    <div className="label-icon-large">
                        <span className="tag-icon-large">🏷️</span>
                    </div>
                    <h2 className="detail-title">{label.name}</h2>
                </div>

                <h3 className="section-title">Albums:</h3>
                {label.albums && label.albums.length > 0 ? (
                    <div className="albums-grid">
                        {label.albums.map((album) => (
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

export default LabelDetail;