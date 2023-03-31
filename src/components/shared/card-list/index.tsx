import { WorkOrderContext } from '@/contexts/workOrderContext';
import { Space } from 'antd';
import { ReactNode, useContext } from 'react';
import styles from './card-list.module.scss';

type CardListProps = {
	id: number;
	title: string;
	description: string;
	status: string;
	priority: string;
	icon: ReactNode;
};

export const CardList = ({
	id,
	title,
	description,
	status,
	priority,
	icon,
}: CardListProps) => {
	const { onSelect } = useContext(WorkOrderContext);

	return (
		<Space
			className={styles['card-list']}
			onClick={() => onSelect(id)}
		>
			<div className={styles['icon']}>{icon}</div>

			<div className={styles['infos']}>
				<div className={styles['infos__title']}>
					<p>{title}</p>
					<span>#{id}</span>
				</div>

				<p className={styles['infos__description']}>{description}</p>

				<div className={styles['infos__status']}>
					<span
						className={`${styles['status-name']} ${
							styles[status.replace(' ', '')]
						}`}
					>
						{status}
					</span>
					<div
						className={`${styles['priority']} ${styles[priority]}`}
					>
						{priority}
					</div>
				</div>
			</div>
		</Space>
	);
};
