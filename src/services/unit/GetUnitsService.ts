import { IUnit } from '@/types/interfaces/unit.interface';
import axios from 'axios';

export const GetListUnitsService = async () => {
	return await axios<IUnit[]>({
		method: 'GET',
		url: `${process.env.NEXT_PUBLIC_API_URL}/units`,
	});
};
