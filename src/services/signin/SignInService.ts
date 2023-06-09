import { apiClient } from '@/libs/axiosClient';
import { IResponse } from '@/types/interfaces/api.interface';
import {
	ISignInParams,
	ISignInResponse,
} from '@/types/interfaces/signin.interface';

export async function SignInService({
	email,
	password,
}: ISignInParams): Promise<IResponse<ISignInResponse>> {
	return await apiClient({
		method: 'POST',
		url: '/signin',
		data: { email: email, password: password },
	});
}
