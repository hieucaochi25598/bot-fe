import axios from 'axios';
import { IAddAIRequest } from '../types/request/AddAIRequest';
import { GetAIQueryParams } from '../types/request/GetAIQueryParams';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BOT_MANAGEMENT_API_URL}`,
    // Other optional configuration here
});

export const fetchAIs = async (query?: GetAIQueryParams) => {
    const response = await axiosInstance.get('/ai-models', { params: query });
    return response.data;
};

export const createAI = async (ai: IAddAIRequest) => {
    const response = await axiosInstance.post('/ai-models/create', ai);
    return response.data;
};
