export type IResponse<T> = {
	data: T;
	errors: {
		type: 'VALIDATION' | 'INTERNAL_ERROR' | 'INVALID_TYPE';
		message: string;
	}[];
};
