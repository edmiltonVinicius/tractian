import { GetWorkOrderByIdService } from '@/services/work-order/GetWorkOrderByIdService';
import { IResponse } from '@/types/interfaces/api.interface';
import { IListWorkOrder } from '@/types/interfaces/work-order.interface';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse<IResponse<IListWorkOrder | null>>
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
							'Work order id is required, and not sended or is invalid',
						type: 'VALIDATION',
					},
				],
			});
		}

		const { data } = await GetWorkOrderByIdService({ idWorkOrder: +id });

		response.status(200).json({
			data: data || null,
			errors: [],
		});
	} catch (error) {
		return response.status(500).json({
			data: null,
			errors: [
				{
					message: 'Unable to load work orders. Please, try again.',
					type: 'INTERNAL_ERROR',
				},
			],
		});
	}
}
