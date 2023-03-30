export enum MachineStatusEnum {
	ALERT = 'inAlert',
	OPERATION = 'inOperation',
	DOWN_TIME = 'inDownTime',
	UNPLANNED_STOP = 'unplannedStop',
	PLANNED_STOP = 'plannedStop',
}

export enum MachineStatusDisplayEnum {
	inAlert = 'In alert',
	inOperation = 'In operation',
	inDownTime = 'Offline',
	unplannedStop = 'Unplanned stop',
	plannedStop = 'Planned stop',
}
