export enum MachineStatusEnum {
	ALERT = 'inAlert',
	OPERATION = 'inOperation',
	DOWN_TIME = 'inDowntime',
	UNPLANNED_STOP = 'unplannedStop',
	PLANNED_STOP = 'plannedStop',
}

export enum MachineStatusDisplayEnum {
	inAlert = 'In alert',
	inOperation = 'In operation',
	inDowntime = 'Offline',
	unplannedStop = 'Unplanned stop',
	plannedStop = 'Planned stop',
}
