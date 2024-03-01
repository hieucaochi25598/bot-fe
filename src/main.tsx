import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClientProvider = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClientProvider}>
        <App />
    </QueryClientProvider>
);
