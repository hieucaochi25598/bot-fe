import { configureStore } from '@reduxjs/toolkit';
import channelReducer from '../../features/channel/channelSlice';
import aiReducer from '../../features/ai/aiSlice';
import botChatReducer from '../../features/botchat/botChatSlice';
import intergrateReducer from '../../features/intergrate/intergrateSlice';
import appReducer from '../../features/app/appSlice';

export const store = configureStore({
    reducer: {
        channel: channelReducer,
        ai: aiReducer,
        botChat: botChatReducer,
        intergrate: intergrateReducer,
        app: appReducer,
    },
    devTools: import.meta.env.DEV,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
