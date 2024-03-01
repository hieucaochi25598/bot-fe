import { configureStore } from '@reduxjs/toolkit';
import channelReducer from '../../features/channel/channelSlice';

export const store = configureStore({
    reducer: {
        channel: channelReducer,
    },
    devTools: import.meta.env.DEV,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
