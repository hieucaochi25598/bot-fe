import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IBotchat } from '../../types/IBotChat';

export interface BotchatState {
    botChats: IBotchat[];
    botChatInformation: IBotchat;
    page: number;
    pageSize: number;
    total: number;
}

const initialState: BotchatState = {
    botChats: [],
    botChatInformation: {} as IBotchat,
    page: 1,
    pageSize: 3,
    total: 0,
};

export const botChatSlice = createSlice({
    name: 'botChat',
    initialState,
    reducers: {
        setBotchats: (state, action: PayloadAction<IBotchat[]>) => {
            state.botChats = [...action.payload];
        },

        setBotChatInformation: (state, action: PayloadAction<IBotchat>) => {
            state.botChatInformation = action.payload;
        },

        addBotchat: (state, action: PayloadAction<IBotchat>) => {
            const createdBotchat = action.payload;
            state.botChats = [createdBotchat, ...state.botChats];
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
export const {
    setBotchats,
    setBotChatInformation,
    addBotchat,
    setPage,
    setTotal,
} = botChatSlice.actions;

export default botChatSlice.reducer;
