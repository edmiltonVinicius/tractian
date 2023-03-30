import { apiClient } from '@/libs/axiosClient';

export async function SignOutService(): Promise<boolean> {
	return await apiClient({
		method: 'POST',
		url: '/signout',
	});
}
