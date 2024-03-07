import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
    menuKey: string;
}

const initialState: AppState = {
    menuKey: '/channels',
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setMenuKey: (state, action: PayloadAction<string>) => {
            state.menuKey = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setMenuKey } = appSlice.actions;

export default appSlice.reducer;
