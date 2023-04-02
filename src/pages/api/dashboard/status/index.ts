import { GetAllAssetsService } from '@/services/assets/GetAllAssetsService';
import { IResponse } from '@/types/interfaces/api.interface';
import { IListStatus } from '@/types/interfaces/status.interface';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse<IResponse<IListStatus[] | null>>
) {
	const method = request.method;

	if (method !== 'GET') {
		response.setHeader('Allow', ['GET']);
		return response.status(405).end(`Method ${method} Not Allowed`);
	}

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

	try {
		const { data } = await GetAllAssetsService({ unitId: +unitId });

		response.status(200).json({
			data: data.length
				? data.map((item) => {
						const { id, healthscore, image, status, model, name } =
							item;
						return {
							id,
							healthscore,
							image,
							model,
							status,
							name,
						};
				  })
				: null,
			errors: [],
		});
	} catch (error) {
		return response.status(500).json({
			data: null,
			errors: [
				{
					message: 'Unable to load assets. Please, try again.',
					type: 'INTERNAL_ERROR',
				},
			],
		});
	}
}
