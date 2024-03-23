import { AddIntergrateAIWithBotRequest } from './../types/request/AddIntergrateRequest';
import { AddIntergrateRequest } from '../types/request/AddIntergrateRequest';
import {
    GetIntergrateAIWithBotQueryParams,
    GetIntergrateQueryParams,
} from '../types/request/GetIntergrateQueryParams';
import { axiosInstance } from './axios';

export const fetchIntergrates = async (query?: GetIntergrateQueryParams) => {
    const response = await axiosInstance.get('/intergrates', { params: query });
    return response.data;
};

export const fetchIntergratesAIWithBot = async (
    query?: GetIntergrateAIWithBotQueryParams
) => {
    const response = await axiosInstance.get('/intergrates-ai-bot', {
        params: query,
    });
    return response.data;
};

export const createIntergrate = async (intergrate: AddIntergrateRequest) => {
    const response = await axiosInstance.post(
        '/intergrates/create',
        intergrate
    );
    return response.data;
};

export const createIntergrateAIWithBot = async (
    intergrate: AddIntergrateAIWithBotRequest
) => {
    const response = await axiosInstance.post(
        '/intergrates/create-ai-bots',
        intergrate
    );
    return response.data;
};
