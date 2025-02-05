import {QueryClient} from "@tanstack/react-query";

let queryClient: QueryClient;

if (typeof window !== 'undefined') {
    if (!window.__queryClient) {
        window.__queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: 2, refetchOnWindowFocus: false, staleTime: 1000 * 60 },
                mutations: { retry: 1 },
            },
        });
    }
    queryClient = window.__queryClient;
} else {
    queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: 2, refetchOnWindowFocus: false, staleTime: 1000 * 60 },
            mutations: { retry: 1 },
        },
    });
}

declare global{
    interface Window {
        __queryClient?: QueryClient
    }
}

export default queryClient;