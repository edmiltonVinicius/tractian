import { AssetModelEnum } from '../enum/asset-model.enum';
import { MachineStatusEnum } from '../enum/machine-status.enum';

export interface IAsset {
	assignedUserIds: number[];
	companyId: number;
	healthHistory: IHealthHistory[];
	healthscore: number;
	id: number;
	image: string;
	metrics: IAssetMetric;
	model: AssetModelEnum;
	name: string;
	sensors: string[];
	specifications: {
		maxTemp: number | null;
		power: number | null;
		rpm: number | null;
	};
	status: MachineStatusEnum;
	unitId: number;
}

export interface IAssetMetric {
	lastUptimeAt: string;
	totalCollectsUptime: number;
	totalUptime: number;
}

export interface IHealthHistory {
	status: MachineStatusEnum;
	timestamp: string;
}
