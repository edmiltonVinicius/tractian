import { IListWorkOrder } from '@/types/interfaces/work-order.interface';
import { ApiFilled, ContainerOutlined } from '@ant-design/icons';
import { Space, Spin } from 'antd';
import { CardList } from '../shared/card-list';
import styles from './list-work-orders.module.scss';

type ListWorkOrderProps = {
	isLoading: boolean;
	isError: boolean;
	listCards: IListWorkOrder[] | undefined;
};

export const ListWorkOrder = ({
	isLoading,
	isError,
	listCards,
}: ListWorkOrderProps) => {
	return (
		<Space className={styles['list-work-order']}>
			{isLoading && (
				<div className={styles['list-work-order__spinner']}>
					<Spin size="large" />
				</div>
			)}

			{isError && (
				<div className={styles['list-work-order__error']}>
					<ApiFilled />
					<p>Oh no BlueCap, the API broke...</p>
				</div>
			)}

			{!isError && !isLoading && listCards && (
				<>
					{listCards.map((card) => {
						return (
							<CardList
								key={card.id}
								id={card.id}
								description={card.description}
								icon={
									<ContainerOutlined
										style={{
											fontSize: '32px',
											color: '#b1ceec',
										}}
									/>
								}
								priority={card.priority}
								status={card.status}
								title={card.title}
							/>
						);
					})}
				</>
			)}
		</Space>
	);
};
