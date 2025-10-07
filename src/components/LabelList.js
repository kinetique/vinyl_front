import React, { useEffect, useState } from "react";

function LabelList() {
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/labels/")
            .then((response) => response.json())
            .then((data) => setLabels(data))
            .catch((error) => console.error("Error fetching labels:", error));
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>🏷️ Labels</h1>
            <ul>
                {labels.map((label) => (
                    <li key={label.id}>{label.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default LabelList;
