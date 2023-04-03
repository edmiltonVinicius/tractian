import {
	DashboardOutlined,
	DesktopOutlined,
	FormOutlined,
} from '@ant-design/icons';
import { Menu, MenuProps, Space } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const MenuLayout = () => {
	const router = useRouter();

	const getItemSelectedMenuByPath = (): string => {
		const path = router.pathname;
		if (path.indexOf('/assets/') !== -1) {
			return '/dashboard/status';
		}
		return path === '/dashboard' ? '/dashboard' : path;
	};

	const [current, setCurrent] = useState<string>(getItemSelectedMenuByPath());

	const items: MenuProps['items'] = [
		{
			label: 'Overview',
			key: '/dashboard',
			icon: <DesktopOutlined />,
			expandIcon: true,
			title: 'Overview',
		},
		{
			label: 'Work orders',
			key: '/dashboard/work-orders',
			icon: <FormOutlined />,
			expandIcon: true,
			title: 'Work orders',
		},
		{
			label: 'Status',
			key: '/dashboard/status',
			icon: <DashboardOutlined />,
			expandIcon: true,
			title: 'Status',
		},
	];

	const onClick: MenuProps['onClick'] = ({ key }) => {
		router.push(key);
	};

	return (
		<Space
			align="center"
			style={{ background: '#fff' }}
			direction="vertical"
			size="large"
		>
			<Menu
				onClick={onClick}
				selectedKeys={[current]}
				mode="horizontal"
				items={items}
				disabledOverflow={true}
			/>
		</Space>
	);
};
