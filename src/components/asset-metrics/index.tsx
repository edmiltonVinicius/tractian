import { MetricsDisplayEnum } from '@/types/enum/metrics.enum';
import { IAssetMetric } from '@/types/interfaces/asset.interface';
import { PieChartOutlined } from '@ant-design/icons';
import styles from './asset-metrics.module.scss';

type AssetMetricsComponentProps = IAssetMetric;

export const AssetMetricsComponent = ({
	totalUptime,
	totalCollectsUptime,
	lastUptimeAt,
}: AssetMetricsComponentProps) => {
	const lastDate = new Date(lastUptimeAt);

	return (
		<div className={styles['metrics']}>
			<div className={styles['metrics__list']}>
				<div className={styles['metrics__content']}>
					<h5>{MetricsDisplayEnum.totalCollectsUptime}</h5>
					<p>
						<PieChartOutlined />
						{totalCollectsUptime}
					</p>
					<span>Total uptime collections (On)</span>
				</div>

				<div className={styles['metrics__content']}>
					<h5>{MetricsDisplayEnum.totalUptime}</h5>
					<p>
						<PieChartOutlined />
						{totalUptime.toFixed(2)}
					</p>
					<span>Total collections hours uptime (On)</span>
				</div>
			</div>

			<div className={styles['metrics__last-date']}>
				Date of Last Collection Uptime (On){': '}
				<span>{lastDate.toLocaleDateString()}</span>
			</div>
		</div>
	);
};
