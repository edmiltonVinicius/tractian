import { AssetModelEnum } from '../enum/asset-model.enum';
import { MachineStatusEnum } from '../enum/machine-status.enum';

export interface IAsset {
	assignedUserIds: number[];
	companyId: number;
	healthHistory: {
		status: MachineStatusEnum;
		timestamp: string;
	}[];
	healthscore: number;
	id: number;
	image: string;
	metrics: {
		lastUptimeAt: string;
		totalCollectsUptime: number;
		totalUptime: number;
	};
	model: AssetModelEnum;
	name: string;
	sensors: string[];
	specifications: {
		maxTemp: number;
	};
	status: MachineStatusEnum;
	unitId: number;
}
