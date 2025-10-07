import React, { useState, useEffect } from 'react';
import { labelsAPI } from '../services/api';
import '../App.css';

const LabelList = ({ onSelectLabel }) => {
    const [labels, setLabels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLabels = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await labelsAPI.getAll();
                setLabels(data);
            } catch (err) {
                setError(err.message);
                console.error(err);
            }
            setLoading(false);
        };

        fetchLabels();
    }, []);

    return (
        <div className="container">
            <h2 className="page-title">Labels</h2>

            {loading ? (
                <div className="loading">Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : labels.length === 0 ? (
                <div className="no-data">Labels not found</div>
            ) : (
                <div className="grid">
                    {labels.map((label) => (
                        <div
                            key={label.id}
                            onClick={() => onSelectLabel(label.id)}
                            className="card label-card"
                        >
                            <div className="label-icon">
                                <span className="tag-icon">🏷️</span>
                            </div>
                            <h3 className="card-title">{label.name}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LabelList;