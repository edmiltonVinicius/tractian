import { ContextProvider } from '@/contexts';
import { queryClient } from '@/libs/queryClient';
import '@/styles/globals.scss';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ConfigProvider
				theme={{
					token: {
						fontFamily: 'Roboto',
					},
				}}
			>
				<ContextProvider>
					<Component {...pageProps} />
				</ContextProvider>
			</ConfigProvider>
		</QueryClientProvider>
	);
}
