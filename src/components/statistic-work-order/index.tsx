import { WorkOrderStatusEnum } from '@/types/enum/work-order-status.enum';
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import styles from './statistic-work-order.module.scss';

type StatisticWorkOrderProps = {
	inProgress: number;
	completed: number;
	isLoading: boolean;
};

export const StatisticWorkOrder = ({
	inProgress,
	completed,
	isLoading,
}: StatisticWorkOrderProps) => {
	return (
		<Row
			gutter={16}
			className={styles['statistic-work-order']}
		>
			<Col span={24}>
				<h3>Statistics</h3>
			</Col>

			<Col span={8}>
				<Card bordered={false}>
					<Statistic
						title={WorkOrderStatusEnum.IN_PROGRESS.toUpperCase()}
						value={inProgress}
						valueStyle={{ color: '#3f8600' }}
						prefix={<ExclamationCircleFilled />}
						loading={isLoading}
					/>
				</Card>
			</Col>

			<Col span={8}>
				<Card bordered={false}>
					<Statistic
						title={WorkOrderStatusEnum.COMPLETED.toUpperCase()}
						value={completed}
						valueStyle={{ color: '#cf1322' }}
						prefix={<CheckCircleFilled />}
						loading={isLoading}
					/>
				</Card>
			</Col>
		</Row>
	);
};
