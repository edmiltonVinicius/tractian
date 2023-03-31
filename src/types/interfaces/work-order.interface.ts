export interface ICheckList {
	completed: boolean;
	task: string;
}

export interface IWorkOrder {
	assetId: number;
	assignedUserIds: number[];
	checklist: ICheckList[];
	description: string;
	id: number;
	priority: string;
	status: string;
	title: string;
}

export interface IListWorkOrder {
	id: number;
	priority: string;
	status: string;
	title: string;
	description: string;
}
