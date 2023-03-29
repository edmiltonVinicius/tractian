import { Layout, Space } from 'antd';
import { ReactNode } from 'react';
import { HeaderLayout } from './components/header';

export const BaseLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Space
			direction="vertical"
			style={{ width: '100%' }}
		>
			<Layout>
				<HeaderLayout />
				<main>{children}</main>
			</Layout>
		</Space>
	);
};
