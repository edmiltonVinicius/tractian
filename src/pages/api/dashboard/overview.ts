import { GetAllAssetsService } from '@/services/assets/getAllAssetsService';
import { MachineStatusEnum } from '@/types/enum/machine-status.enum';
import { IResponse } from '@/types/interfaces/api.interface';
import { IOverview } from '@/types/interfaces/overview.interface';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse<IResponse<IOverview | null>>
) {
	const method = request.method;

	if (method !== 'GET') {
		response.setHeader('Allow', ['GET']);
		return response.status(405).end(`Method ${method} Not Allowed`);
	}

	try {
		const { unitId } = request.query;

		if (!unitId) {
			return response.status(400).json({
				data: null,
				errors: [
					{
						message:
							'Unit id is required, and not sended or is invalid',
						type: 'VALIDATION',
					},
				],
			});
		}

		const { data } = await GetAllAssetsService({ unitId: +unitId });

		response.status(200).json({
			data: {
				statusMachines: [
					{
						status: MachineStatusEnum.OPERATION,
						count: data.filter((asset) => {
							if (asset.status === MachineStatusEnum.OPERATION) {
								return asset;
							}
						}).length,
					},
					{
						status: MachineStatusEnum.ALERT,
						count: data.filter((asset) => {
							if (asset.status === MachineStatusEnum.ALERT) {
								return asset;
							}
						}).length,
					},
					{
						status: MachineStatusEnum.UNPLANNED_STOP,
						count: data.filter((asset) => {
							if (
								asset.status ===
								MachineStatusEnum.UNPLANNED_STOP
							) {
								return asset;
							}
						}).length,
					},
					{
						status: MachineStatusEnum.PLANNED_STOP,
						count: data.filter((asset) => {
							if (
								asset.status === MachineStatusEnum.PLANNED_STOP
							) {
								return asset;
							}
						}).length,
					},
					{
						status: MachineStatusEnum.DOWN_TIME,
						count: data.filter((asset) => {
							if (asset.status === MachineStatusEnum.DOWN_TIME) {
								return asset;
							}
						}).length,
					},
				],
			},
			errors: [],
		});
	} catch (error) {
		return response.status(500).json({
			data: null,
			errors: [
				{
					message: 'Unable to load data. Please, try again.',
					type: 'INTERNAL_ERROR',
				},
			],
		});
	}
}
