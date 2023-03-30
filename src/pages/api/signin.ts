import { IResponse } from '@/types/interfaces/api.interface';
import {
	ISignInParams,
	ISignInResponse,
} from '@/types/interfaces/signin.interface';
import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';

export default function handler(
	request: NextApiRequest,
	response: NextApiResponse<IResponse<ISignInResponse>>
) {
	const method = request.method;

	if (method !== 'POST') {
		response.setHeader('Allow', ['POST']);
		return response.status(405).end(`Method ${method} Not Allowed`);
	}

	const { email, password }: ISignInParams = request.body;

	if (!email || !password) {
		return response.status(400).json({
			data: {
				success: false,
			},
			errors: [
				{
					message: 'Not sent a email or password for authentication.',
					type: 'VALIDATION',
				},
			],
		});
	}

	if (
		email !== process.env.USER_EMAIL ||
		password !== process.env.USER_PASSWORD
	) {
		return response.status(400).json({
			data: {
				success: false,
			},
			errors: [
				{
					message: 'User email or password is invalid.',
					type: 'VALIDATION',
				},
			],
		});
	}

	setCookie(
		{ res: response },
		process.env.KEY_COOKIES as string,
		process.env.VALUE_COOKIES as string,
		{
			maxAge: process.env.TIME_EXPIRATION_COOKIES as string,
			path: '/',
			httpOnly: true,
			sameOrigin: true,
		}
	);

	return response.status(200).json({
		data: {
			success: true,
		},
		errors: [],
	});
}
