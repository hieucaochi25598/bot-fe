import { IChannel } from './../../types/IChannel';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ChannelState {
    channels: IChannel[];
    page: number;
    pageSize: number;
    total: number;
}

const initialState: ChannelState = {
    channels: [],
    page: 1,
    pageSize: 10,
    total: 0,
};

export const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        setChannels: (state, action: PayloadAction<IChannel[]>) => {
            console.log(action.payload);
            state.channels = [...action.payload];
        },

        addChannel: (state, action: PayloadAction<IChannel>) => {
            const createdChannel = action.payload;
            state.channels = [createdChannel, ...state.channels];
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
export const { setChannels, addChannel, setPage, setTotal } =
    channelSlice.actions;

export default channelSlice.reducer;
