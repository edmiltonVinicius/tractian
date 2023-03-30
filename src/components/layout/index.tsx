import { Layout, Space } from 'antd';
import { ReactNode } from 'react';
import { HeaderLayout } from './components/header';
import { MenuLayout } from './components/menu';

export const BaseLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Space
			direction="vertical"
			style={{ width: '100%' }}
		>
			<Layout>
				<HeaderLayout />
				<MenuLayout />
				<main style={{ padding: '30px 25px', backgroundColor: '#fff' }}>
					{children}
				</main>
			</Layout>
		</Space>
	);
};
