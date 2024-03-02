import { GetIntergrateQueryParams } from '../types/request/GetIntergrateQueryParams';
import { axiosInstance } from './axios';

export const fetchIntergrates = async (query?: GetIntergrateQueryParams) => {
    const response = await axiosInstance.get('/intergrates', { params: query });
    return response.data;
};
