import { ListWorkOrder } from '@/components/list-work-orders';
import { BaseLayout } from '@/components/layout';
import { apiClient } from '@/libs/axiosClient';
import { IResponse } from '@/types/interfaces/api.interface';
import { IListWorkOrder } from '@/types/interfaces/work-order.interface';
import { Button, Col, Row, Space, Tabs } from 'antd';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { useQuery } from 'react-query';
import styles from './work-orders.module.scss';
import { WorkOrderStatusEnum } from '@/types/enum/work-order-status.enum';
import { useContext } from 'react';
import { WorkOrderContext } from '@/contexts/workOrderContext';
import { DetailsWorkOrder } from '@/components/details-work-order';
import { PlusOutlined } from '@ant-design/icons';
import { StatisticWorkOrder } from '@/components/statistic-work-order';
import { VerticalDividerComponent } from '@/components/shared/vertical-divider';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { [process.env.KEY_COOKIES as string]: valueCookie } =
		nookies.get(ctx);

	if (!valueCookie || valueCookie !== (process.env.VALUE_COOKIES as string)) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default function WorkOrders() {
	const { orderWorkerSelected } = useContext(WorkOrderContext);

	const loadWorkOrders = async () => {
		return (await apiClient({
			method: 'GET',
			url: '/dashboard/work-orders',
		})) as IResponse<IListWorkOrder[]>;
	};

	const { isLoading, isError, data } = useQuery(['work-orders-page'], () =>
		loadWorkOrders()
	);

	return (
		<BaseLayout title="Work orders">
			<Row>
				<Col className={styles['header-page']}>
					<h1>Work orders</h1>
					<Button
						type="primary"
						icon={<PlusOutlined />}
					>
						Add work order
					</Button>
				</Col>
			</Row>

			<Row>
				<Col span={9}>
					<Space className={styles['work-orders']}>
						<Tabs
							centered
							defaultActiveKey="2"
							items={[
								{
									label: (
										<span
											className={
												styles['work-orders__label']
											}
										>
											{WorkOrderStatusEnum.IN_PROGRESS}
										</span>
									),
									key: WorkOrderStatusEnum.IN_PROGRESS,
									children: (
										<ListWorkOrder
											isError={isError}
											isLoading={isLoading}
											listCards={data?.data.filter(
												(card) => {
													if (
														card.status ===
														WorkOrderStatusEnum.IN_PROGRESS
													) {
														return card;
													}
												}
											)}
										/>
									),
								},
								{
									label: (
										<span
											className={
												styles['work-orders__label']
											}
										>
											{WorkOrderStatusEnum.COMPLETED}
										</span>
									),
									key: WorkOrderStatusEnum.COMPLETED,
									children: (
										<ListWorkOrder
											isError={isError}
											isLoading={isLoading}
											listCards={data?.data.filter(
												(card) => {
													if (
														card.status ===
														WorkOrderStatusEnum.COMPLETED
													) {
														return card;
													}
												}
											)}
										/>
									),
								},
							]}
						/>
					</Space>
				</Col>

				<Col span={3}>
					<VerticalDividerComponent />
				</Col>

				<Col span={12}>
					{!orderWorkerSelected && (
						<StatisticWorkOrder
							completed={
								data?.data.filter(
									(item) =>
										item.status ===
										WorkOrderStatusEnum.COMPLETED
								).length || 0
							}
							inProgress={
								data?.data.filter(
									(item) =>
										item.status ===
										WorkOrderStatusEnum.IN_PROGRESS
								).length || 0
							}
							isLoading={isLoading}
						/>
					)}
					{orderWorkerSelected && (
						<DetailsWorkOrder idWorkOrder={orderWorkerSelected} />
					)}
				</Col>
			</Row>
		</BaseLayout>
	);
}
