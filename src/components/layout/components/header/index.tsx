import React from 'react';
import {
	Avatar,
	Col,
	Dropdown,
	MenuProps,
	message,
	Row,
	Space,
	Spin,
} from 'antd';
import Image from 'next/image';
import styles from './header.module.scss';
import logoImage from '../../../../../public/images/logo-tractian-header.png';
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { GetListUnitsService } from '@/services/unit/GetUnitsService';
import { useQuery } from 'react-query';
import Link from 'next/link';
import { SignOutService } from '@/services/signout/SignOutService';
import { useRouter } from 'next/router';

export const HeaderLayout = () => {
	const router = useRouter();
	const preventDefaultAction = (e: React.MouseEvent) => e.preventDefault();

	const {
		isLoading,
		isError,
		data: unitList,
	} = useQuery('unitsList', async () => await GetListUnitsService(), {
		refetchOnWindowFocus: false,
		cacheTime: 60,
	});

	const itemsMenuUnits: MenuProps['items'] = unitList?.data.map((unit) => {
		return {
			label: unit.name,
			key: unit.id,
		};
	});

	const itemsMenuUser: MenuProps['items'] = [
		{
			icon: <LogoutOutlined />,
			label: 'log out',
			key: '',
		},
	];

	const onSelectUnit: MenuProps['onClick'] = ({ key }) => {
		message.info(`Click on item ${key}`);
	};

	const onSignOut: MenuProps['onClick'] = async ({ key }) => {
		await SignOutService();
		router.replace('/');
	};

	return (
		<header className={styles.header}>
			<Row align="bottom">
				<Col span={4}>
					<Link href="/">
						<Image
							src={logoImage}
							alt="Image Tractian"
							width={180}
						/>
					</Link>
				</Col>

				<Col span={4}>
					<Dropdown
						menu={{ items: itemsMenuUnits, onClick: onSelectUnit }}
						trigger={['click']}
						disabled={isError || isLoading}
					>
						<a
							onClick={preventDefaultAction}
							className={styles['button-select--unit']}
						>
							<Space>
								{isLoading && (
									<Spin
										style={{
											marginLeft: '10px',
											position: 'relative',
											top: '5px',
										}}
									/>
								)}
								{isError && <span>Ops...</span>}
								{!isError && !isLoading && unitList && (
									<>
										<span>{unitList.data[0].name}</span>
										<DownOutlined
											style={{ fontSize: 12 }}
										/>
									</>
								)}
							</Space>
						</a>
					</Dropdown>
				</Col>

				<Col
					span={4}
					offset={12}
				>
					<Avatar
						style={{ backgroundColor: '#87d068' }}
						icon={<UserOutlined />}
					/>
					<Dropdown
						menu={{ items: itemsMenuUser, onClick: onSignOut }}
						trigger={['click']}
					>
						<a
							onClick={preventDefaultAction}
							className={styles['button-select--user']}
						>
							<Space>
								<span>BlueCaps</span>
								<DownOutlined style={{ fontSize: 12 }} />
							</Space>
						</a>
					</Dropdown>
				</Col>
			</Row>
		</header>
	);
};
