const API_BASE = "http://127.0.0.1:8000";

export async function getAlbums(search = "", sort = "") {
    let url = `${API_BASE}/albums/`;
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (sort) params.append("sort", sort);
    if (params.toString()) url += "?" + params.toString();

    const res = await fetch(url);
    return res.json();
}

export async function getAlbum(id) {
    const res = await fetch(`${API_BASE}/albums/${id}/`);
    return res.json();
}

export async function getAbout() {
    const res = await fetch(`${API_BASE}/about/`);
    return res.json();
}
