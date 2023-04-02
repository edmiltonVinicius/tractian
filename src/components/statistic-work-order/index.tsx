import { WorkOrderStatusEnum } from '@/types/enum/work-order-status.enum';
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import styles from './statistic-work-order.module.scss';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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
	const optionsChart: Highcharts.Options = {
		chart: { type: 'pie', width: 500 },
		title: { text: '' },
		colors: ['#e19d9b', '#5fbe9f'],
		series: [
			{
				colorByPoint: true,
				data: [
					{
						name: WorkOrderStatusEnum.IN_PROGRESS.toUpperCase(),
						y: inProgress,
					},
					{
						name: WorkOrderStatusEnum.COMPLETED.toUpperCase(),
						y: completed,
					},
				],
				type: 'pie',
			},
		],
		tooltip: {
			pointFormat:
				'{series.name} {series.id}: <b>{point.percentage:.1f}%</b>',
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
				},
				showInLegend: false,
			},
		},
		credits: {
			enabled: false,
		},
	};

	return (
		<>
			<Row
				gutter={16}
				className={styles['statistic-work-order']}
			>
				<Col span={24}>
					<h3>Statue stats</h3>
				</Col>

				<Col span={8}>
					<Card bordered={true}>
						<Statistic
							title={WorkOrderStatusEnum.IN_PROGRESS.toUpperCase()}
							value={inProgress}
							valueStyle={{ color: '#cf1322' }}
							prefix={<ExclamationCircleFilled />}
							loading={isLoading}
						/>
					</Card>
				</Col>

				<Col span={8}>
					<Card bordered={true}>
						<Statistic
							title={WorkOrderStatusEnum.COMPLETED.toUpperCase()}
							value={completed}
							valueStyle={{ color: '#3f8600' }}
							prefix={<CheckCircleFilled />}
							loading={isLoading}
						/>
					</Card>
				</Col>
			</Row>

			<Row>
				<Col span={18}>
					<HighchartsReact
						highcharts={Highcharts}
						options={optionsChart}
					/>
				</Col>
			</Row>
		</>
	);
};
