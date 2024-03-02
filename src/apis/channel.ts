import axios from 'axios';
import { IAddChannelRequest } from '../types/request/IAddChannelRequest';
import { GetChannelQueryParams } from '../types/request/GetChannelQueryParams';

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BOT_MANAGEMENT_API_URL}`,
    // Other optional configuration here
});

export const fetchChannels = async (query?: GetChannelQueryParams) => {
    const response = await axiosInstance.get('/channels', { params: query });
    return response.data;
};

export const createChannel = async (channel: IAddChannelRequest) => {
    const response = await axiosInstance.post('/channels/create', channel);
    return response.data;
};
