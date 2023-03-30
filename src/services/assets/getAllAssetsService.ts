import { IAsset } from '@/types/interfaces/asset.interface';
import axios, { AxiosResponse } from 'axios';

type GetAllAssetsServiceParams = {
	unitId: number;
};

export const GetAllAssetsService = async ({
	unitId,
}: GetAllAssetsServiceParams): Promise<AxiosResponse<IAsset[]>> => {
	return await axios({
		method: 'GET',
		url: `${process.env.NEXT_PUBLIC_API_URL}/assets?unitId=${unitId}`,
	});
};
