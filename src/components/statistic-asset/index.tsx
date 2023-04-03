import { HighchartsReact } from 'highcharts-react-official';
import Highcharts from 'highcharts';
import {
	MachineStatusDisplayEnum,
	MachineStatusEnum,
} from '@/types/enum/machine-status.enum';
import { IHealthHistory } from '@/types/interfaces/asset.interface';

type StatisticAssetComponentProps = {
	healthHistory: IHealthHistory[];
};

export const StatisticAssetComponent = ({
	healthHistory,
}: StatisticAssetComponentProps) => {
	const countInAlerts = healthHistory.filter((item) => {
		if (item.status === MachineStatusEnum.ALERT) {
			return item;
		}
	}).length;

	const countInOperation = healthHistory.filter((item) => {
		if (item.status === MachineStatusEnum.OPERATION) {
			return item;
		}
	}).length;

	const countInDowntime = healthHistory.filter((item) => {
		if (item.status === MachineStatusEnum.DOWN_TIME) {
			return item;
		}
	}).length;

	const countUnplannedStop = healthHistory.filter((item) => {
		if (item.status === MachineStatusEnum.UNPLANNED_STOP) {
			return item;
		}
	}).length;

	const countPlannedStop = healthHistory.filter((item) => {
		if (item.status === MachineStatusEnum.PLANNED_STOP) {
			return item;
		}
	}).length;

	const optionsChart: Highcharts.Options = {
		chart: {
			type: 'column',
			borderRadius: 4,
			borderWidth: 1,
			borderColor: '#ccc',
			spacing: [30, 30, 30, 30],
		},
		title: {
			align: 'left',
			text: 'Stats per day:',
			style: {
				fontFamily: 'Roboto',
				color: '#3f559f',
				fontSize: '20px',
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
				text: '',
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
					format: '{point.y} days',
				},
			},
		},
		tooltip: {
			headerFormat:
				'<span style="font-size:11px">{series.name}:</span><br>',
			pointFormat:
				'<span style="color:{point.color}">{point.name}</span>: <b>{point.y} days</b><br/>',
		},
		colors: ['#479337', '#a53430', '#cdad6f', '#62b8b8', '#959595'],
		series: [
			{
				name: 'Machine',
				colorByPoint: true,
				type: 'column',
				data: [
					{
						name: MachineStatusDisplayEnum.inOperation,
						y: countInOperation ? countInOperation * 7 : 0,
						drilldown: MachineStatusDisplayEnum.inDowntime,
					},
					{
						name: MachineStatusDisplayEnum.inAlert,
						y: countInAlerts ? countInAlerts * 7 : 0,
						drilldown: MachineStatusDisplayEnum.inAlert,
					},
					{
						name: MachineStatusDisplayEnum.unplannedStop,
						y: countUnplannedStop ? countUnplannedStop * 7 : 0,
						drilldown: MachineStatusDisplayEnum.unplannedStop,
					},
					{
						name: MachineStatusDisplayEnum.plannedStop,
						y: countPlannedStop ? countPlannedStop * 7 : 0,
						drilldown: MachineStatusDisplayEnum.plannedStop,
					},
					{
						name: MachineStatusDisplayEnum.inDowntime,
						y: countInDowntime ? countInDowntime * 7 : 0,
						drilldown: MachineStatusDisplayEnum.inDowntime,
					},
				],
			},
		],
		credits: {
			enabled: false,
		},
	};

	return (
		<HighchartsReact
			highcharts={Highcharts}
			options={optionsChart}
		/>
	);
};
