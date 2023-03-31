import { GetAllWorkOrdersService } from '@/services/work-order/GetAllWorkOrdersService';
import { IResponse } from '@/types/interfaces/api.interface';
import { IListWorkOrder } from '@/types/interfaces/work-order.interface';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse<IResponse<IListWorkOrder[] | null>>
) {
	const method = request.method;

	if (method !== 'GET') {
		response.setHeader('Allow', ['GET']);
		return response.status(405).end(`Method ${method} Not Allowed`);
	}

	try {
		const { data } = await GetAllWorkOrdersService();

		response.status(200).json({
			data: data?.length
				? data.map((item) => {
						const { id, description, priority, status, title } =
							item;
						return {
							id,
							description,
							priority,
							status,
							title,
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
					message: 'Unable to load work orders. Please, try again.',
					type: 'INTERNAL_ERROR',
				},
			],
		});
	}
}
