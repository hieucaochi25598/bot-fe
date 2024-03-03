import { AddIntergrateRequest } from '../types/request/AddIntergrateRequest';
import { GetIntergrateQueryParams } from '../types/request/GetIntergrateQueryParams';
import { axiosInstance } from './axios';

export const fetchIntergrates = async (query?: GetIntergrateQueryParams) => {
    const response = await axiosInstance.get('/intergrates', { params: query });
    return response.data;
};

export const createIntergrate = async (intergrate: AddIntergrateRequest) => {
    const response = await axiosInstance.post(
        '/intergrates/create',
        intergrate
    );
    return response.data;
};
