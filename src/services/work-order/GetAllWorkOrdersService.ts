import { IWorkOrder } from '@/types/interfaces/work-order.interface';
import axios, { AxiosResponse } from 'axios';

export const GetAllWorkOrdersService = async (): Promise<
	AxiosResponse<IWorkOrder[]>
> => {
	return await axios({
		method: 'GET',
		url: `${process.env.API_URL}/workorders`,
	});
};
