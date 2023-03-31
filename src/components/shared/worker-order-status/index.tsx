import { Space } from 'antd';
import { ReactNode } from 'react';
import styles from './worker-order-status.module.scss';

type WorkerOrderStatusProps = {
	active: boolean;
	icon: ReactNode;
	title: string;
};

export const WorkerOrderStatus = ({
	active,
	icon,
	title,
}: WorkerOrderStatusProps) => {
	return (
		<Space
			className={`${styles['worker-order-status']} ${
				active && styles['active']
			}`}
		>
			<span>{icon}</span>
			<p>{title}</p>
		</Space>
	);
};
