import {
	AlertOutlined,
	DashboardOutlined,
	DesktopOutlined,
	FormOutlined,
	UsergroupAddOutlined,
} from '@ant-design/icons';
import { Menu, MenuProps, Space } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const MenuLayout = () => {
	const router = useRouter();

	const getItemSelectedMenuByPath = (): string => {
		const path = router.pathname;
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
			label: 'Insights',
			key: '/dashboard/insights',
			icon: <AlertOutlined />,
			expandIcon: true,
			title: 'Insights',
		},
		{
			label: 'Status',
			key: '/dashboard/status',
			icon: <DashboardOutlined />,
			expandIcon: true,
			title: 'Status',
		},
		{
			label: 'People',
			key: '/dashboard/people',
			icon: <UsergroupAddOutlined />,
			expandIcon: true,
			children: [
				{
					label: 'Companies',
					key: 'companies',
					title: 'Companies',
				},
				{
					label: 'Users',
					key: 'users',
					title: 'Users',
				},
				{
					label: 'Units',
					key: 'units',
					title: 'Units',
				},
			],
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
