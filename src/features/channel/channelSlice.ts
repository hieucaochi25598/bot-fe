import { IChannel } from './../../types/IChannel';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ChannelState {
    channels: IChannel[];
    channel: IChannel;
    page: number;
    pageSize: number;
    total: number;
}

const initialState: ChannelState = {
    channels: [],
    channel: {} as IChannel,
    page: 1,
    pageSize: 10,
    total: 0,
};

export const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        setChannel: (state, action: PayloadAction<IChannel>) => {
            state.channel = action.payload;
        },

        setChannels: (state, action: PayloadAction<IChannel[]>) => {
            state.channels = action.payload;
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
export const { setChannels, setChannel, addChannel, setPage, setTotal } =
    channelSlice.actions;

export default channelSlice.reducer;
