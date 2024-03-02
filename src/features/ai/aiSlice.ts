import { IAI } from '../../types/IAI';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AIState {
    ais: IAI[];
    page: number;
    pageSize: number;
    total: number;
}

const initialState: AIState = {
    ais: [],
    page: 1,
    pageSize: 10,
    total: 0,
};

export const aiSlice = createSlice({
    name: 'ai',
    initialState,
    reducers: {
        setAIs: (state, action: PayloadAction<IAI[]>) => {
            state.ais = action.payload;
        },

        addAI: (state, action: PayloadAction<IAI>) => {
            const createdAI = action.payload;
            state.ais = [createdAI, ...state.ais];
        },

        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },

        setTotal: (state, action: PayloadAction<number>) => {
            state.total = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setAIs, addAI, setPage, setTotal } =
    aiSlice.actions;

export default aiSlice.reducer;
