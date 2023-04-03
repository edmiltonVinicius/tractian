import { CardStatusComponent } from '@/components/card-status';
import { BaseLayout } from '@/components/layout';
import { VerticalDividerComponent } from '@/components/shared/vertical-divider';
import { UnitContext } from '@/contexts/unitContext';
import { apiClient } from '@/libs/axiosClient';
import { IResponse } from '@/types/interfaces/api.interface';
import { IListStatus } from '@/types/interfaces/status.interface';
import { Col, Row, Spin } from 'antd';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import styles from './status.module.scss';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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

export default function PageStatus() {
	const { unitSelected } = useContext(UnitContext);

	const loadStatus = async () => {
		return (await apiClient({
			method: 'GET',
			url: '/dashboard/status',
			params: { unitId: unitSelected },
		})) as IResponse<IListStatus[]>;
	};

	const { isLoading, isError, data } = useQuery(
		[`status-page-${unitSelected}`],
		() => loadStatus()
	);

	const optionsChart: Highcharts.Options = {
		chart: {
			type: 'column',
		},
		title: {
			align: 'left',
			text: 'Total life health score stats',
			style: {
				fontFamily: 'Roboto',
				color: '#3f559f',
				fontSize: '24px',
				fontWeight: '500',
			},
			margin: 24,
		},
		accessibility: {
			announceNewData: {
				enabled: true,
			},
		},
		xAxis: {
			type: 'category',
		},
		yAxis: {
			title: {
				text: 'From 0 to 100%',
			},
		},
		legend: {
			enabled: false,
		},
		plotOptions: {
			series: {
				borderWidth: 0,
				dataLabels: {
					enabled: true,
					format: '{point.y:.1f}%',
				},
			},
		},

		tooltip: {
			headerFormat:
				'<span style="font-size:11px">{series.name}:</span><br>',
			pointFormat:
				'<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b><br/>',
		},

		series: [
			{
				name: 'Machine',
				colorByPoint: true,
				type: 'column',
				data: data?.data.map((item) => {
					return {
						name: item.name,
						y: item.healthscore,
						drilldown: item.name,
					};
				}),
			},
		],
		credits: {
			enabled: false,
		},
	};

	return (
		<BaseLayout title="Status">
			<Row>
				<Col
					span={9}
					className={styles['status']}
				>
					<div className={styles['status__list']}>
						{isLoading && (
							<div className={styles['loading']}>
								<Spin size="large" />
							</div>
						)}

						{isError && <span>ERROR</span>}

						{!isLoading && !isError && data && (
							<>
								{data.data.map((item) => {
									return (
										<CardStatusComponent
											key={item.id}
											id={item.id}
											name={item.name}
											image={item.image}
											model={item.model}
											healthscore={item.healthscore}
											status={item.status}
										/>
									);
								})}
							</>
						)}
					</div>
				</Col>

				<Col span={2}>
					<VerticalDividerComponent />
				</Col>

				<Col span={13}>
					{isLoading && (
						<div className={styles['loading']}>
							<Spin size="large" />
						</div>
					)}

					{!isLoading && !isError && data && (
						<HighchartsReact
							highcharts={Highcharts}
							options={optionsChart}
						/>
					)}
				</Col>
			</Row>
		</BaseLayout>
	);
}
