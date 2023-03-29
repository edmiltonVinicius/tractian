import { IUnit } from '@/types/unit.interface';
import axios from 'axios';

export async function GetListUnitsService() {
	return await axios<IUnit[]>({
		method: 'GET',
		url: `${process.env.NEXT_PUBLIC_API_URL}/units`,
	});
}
