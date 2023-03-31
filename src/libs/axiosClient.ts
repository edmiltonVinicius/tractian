import axios from 'axios';

export const apiClient = axios.create({
	baseURL: '/api',
	headers: {
		'Content-type': 'application/json',
	},
	timeout: 6000,
});

apiClient.interceptors.response.use(
	(success) => {
		const { data } = success;
		return data;
	},
	(error) => {
		const { response } = error;
		return Promise.reject(response?.data);
	}
);
