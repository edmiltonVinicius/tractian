import { Layout, Space } from 'antd';
import Head from 'next/head';
import { ReactNode } from 'react';
import { HeaderLayout } from './components/header';
import { MenuLayout } from './components/menu';

type BaseLayoutProps = {
	children: ReactNode;
	title: string;
};

export const BaseLayout = ({ children, title }: BaseLayoutProps) => {
	return (
		<Space
			direction="vertical"
			style={{ width: '100%' }}
		>
			<Head>
				<title>Tractian - {title}</title>
			</Head>
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
