import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IIntergrate } from '../../types/IIntergrate';

export interface IntergrateState {
    intergrates: IIntergrate[];
    page: number;
    pageSize: number;
    total: number;
}

const initialState: IntergrateState = {
    intergrates: [],
    page: 1,
    pageSize: 10,
    total: 0,
};

export const intergrateSlice = createSlice({
    name: 'intergrate',
    initialState,
    reducers: {
        setIntergrates: (state, action: PayloadAction<IIntergrate[]>) => {
            state.intergrates = action.payload;
        },

        addIntergrate: (state, action: PayloadAction<IIntergrate>) => {
            const createdIntergrate = action.payload;
            state.intergrates = [createdIntergrate, ...state.intergrates];
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
export const { setIntergrates, addIntergrate, setPage, setTotal } =
    intergrateSlice.actions;

export default intergrateSlice.reducer;
