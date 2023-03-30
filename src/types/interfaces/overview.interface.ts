import { MachineStatusEnum } from '../enum/machine-status.enum';

export interface IStatusMachines {
	status: MachineStatusEnum;
	count: number;
}

export interface IOverview {
	statusMachines: IStatusMachines[];
}
