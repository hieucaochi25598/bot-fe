import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChannelPage from './pages/Channel/ChannelPage';
import RootLayout from './pages/RootLayout/RootLayout';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import { useIsMutating } from '@tanstack/react-query';
import IntergrationPage from './pages/Intergration/IntergrationPage';
import BotChatPage from './pages/BotChat/BotChatPage';
import AIPage from './pages/AI/AIPage';
import './App.css';
import LoadingMask from './components/LoadingMask/LoadingMask';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <div>Error Page</div>,
        children: [
            {
                path: '/channels',
                element: <ChannelPage />,
            },
            {
                path: '/ais',
                element: <AIPage />,
            },
            {
                path: '/bots',
                element: <BotChatPage />,
            },
            {
                path: '/intergrations',
                element: <IntergrationPage />,
            },
        ],
    },
]);

const App = () => {
    const isMutating = useIsMutating();

    return (
        <React.StrictMode>
            <Provider store={store}>
                {!!isMutating && <LoadingMask />}
                <RouterProvider router={router} />
            </Provider>
        </React.StrictMode>
    );
};

export default App;
