const API_URL = 'http://127.0.0.1:8000';

export const albumsAPI = {
    getAll: async (searchQuery = '', sortBy = '') => {
        let url = `${API_URL}/albums/?`;
        if (searchQuery) url += `search=${searchQuery}&`;
        if (sortBy) url += `sort=${sortBy}`;

        const response = await fetch(url);
        if (response.status === 204) {
            return [];
        }
        if (!response.ok) {
            throw new Error('Download Error');
        }
        return await response.json();
    },

    getById: async (id) => {
        const response = await fetch(`${API_URL}/albums/${id}/`);
        if (!response.ok) {
            throw new Error('Download Error');
        }
        return await response.json();
    },

    getTracks: async (id) => {
        const response = await fetch(`${API_URL}/albums/${id}/tracks/`);
        if (!response.ok) {
            throw new Error('Download Error');
        }
        return await response.json();
    }
};

export const artistsAPI = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/artists/`);
        if (!response.ok) {
            throw new Error('Download Error');
        }
        return await response.json();
    },

    getById: async (id) => {
        const response = await fetch(`${API_URL}/artists/${id}/`);
        if (!response.ok) {
            throw new Error('Download Error');
        }
        return await response.json();
    }
};

export const labelsAPI = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/labels/`);
        if (!response.ok) {
            throw new Error('Download Error');
        }
        return await response.json();
    },

    getById: async (id) => {
        const response = await fetch(`${API_URL}/labels/${id}/`);
        if (!response.ok) {
            throw new Error('Download Error');
        }
        return await response.json();
    }
};

export const aboutAPI = {
    getInfo: async () => {
        const response = await fetch(`${API_URL}/about/`);
        if (!response.ok) {
            throw new Error('Download Error');
        }
        return await response.json();
    }
};