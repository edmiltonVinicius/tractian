import { AssetModelEnum } from '../enum/asset-model.enum';
import { MachineStatusEnum } from './../enum/machine-status.enum';

export interface IListStatus {
	id: number;
	name: string;
	status: MachineStatusEnum;
	model: AssetModelEnum;
	image: string;
	healthscore: number;
}
