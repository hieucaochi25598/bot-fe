import axios from 'axios';
import { IAddAIRequest } from '../types/form/IAddAIRequest';
import { GetAIQueryParams } from '../types/request/GetAIQueryParams';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BOT_MANAGEMENT_API_URL}`,
    // Other optional configuration here
});

export const fetchAIs = async (query: GetAIQueryParams) => {
    const response = await axiosInstance.get('/ais', { params: query });
    return response.data;
};

export const createAI = async (ai: IAddAIRequest) => {
    const response = await axiosInstance.post('/ai/create', ai);
    return response.data;
};
