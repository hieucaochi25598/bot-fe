import { IAddChannelRequest } from '../types/request/IAddChannelRequest';
import { GetChannelQueryParams } from '../types/request/GetChannelQueryParams';
import { axiosInstance } from './axios';

export const fetchChannels = async (query?: GetChannelQueryParams) => {
    const response = await axiosInstance.get('/channels', { params: query });
    return response.data;
};

export const createChannel = async (channel: IAddChannelRequest) => {
    const response = await axiosInstance.post('/channels/create', channel);
    return response.data;
};
