import { Button, Divider, Space, Spin } from 'antd';
import { useContext } from 'react';
import { WorkOrderContext } from '@/contexts/workOrderContext';
import { IWorkOrder } from '@/types/interfaces/work-order.interface';
import Link from 'next/link';
import {
	CheckCircleOutlined,
	CheckOutlined,
	CloseOutlined,
	ExclamationCircleOutlined,
	EyeOutlined,
	PauseCircleOutlined,
	ReloadOutlined,
	UnlockOutlined,
} from '@ant-design/icons';
import { WorkerOrderStatus } from '../shared/worker-order-status';
import { WorkOrderStatusEnum } from '@/types/enum/work-order-status.enum';
import styles from './details-work-order.module.scss';
import { useQuery } from 'react-query';
import { IResponse } from '@/types/interfaces/api.interface';
import { apiClient } from '@/libs/axiosClient';

type DetailsWorkOrderProps = {
	idWorkOrder: number;
};

export const DetailsWorkOrder = ({ idWorkOrder }: DetailsWorkOrderProps) => {
	const { closeDetails } = useContext(WorkOrderContext);

	const loadWorkOrders = async (idWorkOrder: number) => {
		return (await apiClient({
			method: 'GET',
			url: `/dashboard/work-orders/${idWorkOrder}`,
		})) as IResponse<IWorkOrder>;
	};

	const {
		isLoading,
		isError,
		data: workOrder,
	} = useQuery([`work-orders-details-${idWorkOrder}`], () =>
		loadWorkOrders(idWorkOrder)
	);

	return (
		<Space className={styles['details-work-order']}>
			{isLoading && (
				<div className={styles['loading']}>
					<Spin size="large" />
				</div>
			)}

			{!isLoading && !isError && workOrder && (
				<>
					<Space className={styles['header']}>
						<div className={styles['header-wrapper']}>
							<h4>{workOrder.data.title}</h4>
							<Link
								href={`/dashboard/assets/${workOrder.data.assetId}`}
							>
								<EyeOutlined />
								<span>Insight</span>
							</Link>
						</div>

						<div className={styles['button-close']}>
							<Button
								shape="circle"
								icon={<CloseOutlined />}
								onClick={closeDetails}
							/>
						</div>
					</Space>

					<Space className={styles['status']}>
						<h4>Status</h4>

						<Space className={styles['status__wrapper']}>
							<WorkerOrderStatus
								active={
									workOrder.data.status ===
									WorkOrderStatusEnum.OPENED
								}
								icon={<UnlockOutlined />}
								title={WorkOrderStatusEnum.OPENED}
							/>
							<WorkerOrderStatus
								active={
									workOrder.data.status ===
									WorkOrderStatusEnum.ON_HOLD
								}
								icon={<PauseCircleOutlined />}
								title={WorkOrderStatusEnum.ON_HOLD}
							/>
							<WorkerOrderStatus
								active={
									workOrder.data.status ===
									WorkOrderStatusEnum.IN_PROGRESS
								}
								icon={<ReloadOutlined />}
								title={WorkOrderStatusEnum.IN_PROGRESS}
							/>
							<WorkerOrderStatus
								active={
									workOrder.data.status ===
									WorkOrderStatusEnum.COMPLETED
								}
								icon={<CheckOutlined />}
								title={WorkOrderStatusEnum.COMPLETED}
							/>
						</Space>

						<Divider />
					</Space>

					<Space className={styles['tasks']}>
						<h4>Tasks</h4>

						<Space className={styles['tasks-wrapper']}>
							{workOrder.data.checklist.map((task) => {
								return (
									<div
										key={task.task}
										className={styles['tasks-item']}
									>
										<div className={styles['icon']}>
											{task.completed && (
												<CheckCircleOutlined />
											)}
											{!task.completed && (
												<ExclamationCircleOutlined />
											)}
										</div>

										<div className={styles['details']}>
											<p>{task.task}</p>
											{task.completed && (
												<span
													className={
														styles['completed']
													}
												>
													{
														WorkOrderStatusEnum.COMPLETED
													}
												</span>
											)}
											{!task.completed && (
												<span
													className={
														styles['inProgress']
													}
												>
													{
														WorkOrderStatusEnum.IN_PROGRESS
													}
												</span>
											)}
										</div>
									</div>
								);
							})}
						</Space>
					</Space>
				</>
			)}
		</Space>
	);
};
