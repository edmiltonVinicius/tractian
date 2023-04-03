import { GetAssetsByIdService } from '@/services/assets/GetAssetsByIdService';
import { IResponse } from '@/types/interfaces/api.interface';
import { IAsset } from '@/types/interfaces/asset.interface';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse<IResponse<IAsset[] | null>>
) {
	const method = request.method;

	if (method !== 'GET') {
		response.setHeader('Allow', ['GET']);
		return response.status(405).end(`Method ${method} Not Allowed`);
	}

	try {
		const { id } = request.query;

		if (!id) {
			return response.status(400).json({
				data: null,
				errors: [
					{
						message:
							'Asset id is required, and not sended or is invalid',
						type: 'VALIDATION',
					},
				],
			});
		}

		const { data } = await GetAssetsByIdService({ assetId: +id });

		response.status(200).json({
			data: data || null,
			errors: [],
		});
	} catch (error) {
		return response.status(500).json({
			data: null,
			errors: [
				{
					message: 'Unable to get asset. Please, try again.',
					type: 'INTERNAL_ERROR',
				},
			],
		});
	}
}
