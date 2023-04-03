import { IAsset } from '@/types/interfaces/asset.interface';
import axios, { AxiosResponse } from 'axios';

type GetAssetsByIdServiceParams = {
	assetId: number;
};

export const GetAssetsByIdService = async ({
	assetId,
}: GetAssetsByIdServiceParams): Promise<AxiosResponse<IAsset[]>> => {
	return await axios({
		method: 'GET',
		url: `${process.env.API_URL}/assets?id=${assetId}`,
	});
};
