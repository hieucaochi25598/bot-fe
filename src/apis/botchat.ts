import { AddBotChatRequest } from '../types/request/AddBotChatRequest';
import { GetBotChatQueryParams } from '../types/request/GetBotChatQueryParams';
import { axiosInstance } from './axios';

export const fetchBotChats = async (query?: GetBotChatQueryParams) => {
    const response = await axiosInstance.get('/bots', { params: query });
    return response.data;
};

export const createBotChat = async (botChat: AddBotChatRequest) => {
    const response = await axiosInstance.post('/bots/create', botChat);
    return response.data;
};

