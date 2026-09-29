import axios from 'axios'

const API_BASE_URL = "https://localhost:8000";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
        'content-type': 'application/json',
    }
});

export const getData = async (url, config = {}) => {
    const response = await apiClient.get(url, config);
    return response.data;
};

export const postData = async (url, data, config = {}) => {
    const response = await apiClient.post(url, data, config);
    return response.data;
}

export const patchData = async (url, data, config = {}) => {
    const response = await apiClient.patch(url, data, config);
    return response.data;
}

export const deleteData = async (url, config = {}) => {
    const response = await apiClient.delete(url, config);
    return response.data;
}


export default apiClient