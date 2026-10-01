import axios from 'axios'

const apiClient = axios.create({
    baseURL: '/',
    timeout: 5000,
    headers: {
        'content-type': 'application/json',
    }
});

export const getData = async (url) => {
    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching processes:", error);
        throw error;
    }
    
};

export const postData = async (url) => {
    await apiClient.post(url);
}

export const patchData = async (url) => {
    await apiClient.patch(url);
}

export const deleteData = async (url) => {
    await apiClient.delete(url);
}


export default apiClient