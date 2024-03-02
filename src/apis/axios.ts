import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BOT_MANAGEMENT_API_URL}`,
    // Other optional configuration here
});
