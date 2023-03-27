import { QueryClient } from 'react-query';

const FIFTEEN_SECONDS = 1000 * 60 * 15;

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: FIFTEEN_SECONDS,
			refetchOnReconnect: false,
		},
	},
});
