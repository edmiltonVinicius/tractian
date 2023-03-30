import { IResponse } from '@/types/api.interface';
import type { NextApiRequest, NextApiResponse } from 'next';
import { destroyCookie } from 'nookies';

export default function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const method = request.method;

	if (method !== 'POST') {
		response.setHeader('Allow', ['POST']);
		return response.status(405).end(`Method ${method} Not Allowed`);
	}

	destroyCookie({ res: response }, process.env.KEY_COOKIES as string, {
		path: '/',
	});

	return response.send(true);
}
