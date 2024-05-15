import { QueryClient, QueryClientProvider } from 'react-query';

interface ReactQueryClientProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

function ReactQueryClientProvider({ children }: ReactQueryClientProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default ReactQueryClientProvider;
