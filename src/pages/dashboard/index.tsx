import { BaseLayout } from '@/components/layout';
import { OperationStatusComponent } from '@/components/shared/operantion-status';
import { apiClient } from '@/libs/axiosClient';
import { GetAllAssetsService } from '@/services/assets/getAllAssetsService';
import { MachineStatusEnum } from '@/types/enum/machine-status.enum';
import { IResponse } from '@/types/interfaces/api.interface';
import {
	IOverview,
	IStatusMachines,
} from '@/types/interfaces/overview.interface';
import { Col, Row, Spin } from 'antd';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { useQuery } from 'react-query';
import styles from '../../styles/dashboard.module.scss';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { [process.env.KEY_COOKIES as string]: valueCookie } =
		nookies.get(ctx);

	if (!valueCookie || valueCookie !== (process.env.VALUE_COOKIES as string)) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default function Dashboard() {
	const loadPageData = async (unitId: number) => {
		return (await apiClient({
			method: 'GET',
			url: '/dashboard/overview',
			params: { unitId },
		})) as IResponse<IOverview>;
	};

	const { isLoading, isError, data } = useQuery(
		'overview-page',
		() => loadPageData(1), // @TODO -> GET FROM CONTEXT
		{
			refetchOnWindowFocus: false,
		}
	);

	return (
		<BaseLayout>
			<Row
				justify={'center'}
				className={styles['dashboard']}
			>
				{isLoading && (
					<div className={styles['dashboard__loading']}>
						<Spin />
						<span>The data is loading...</span>
					</div>
				)}

				{!isError && !isLoading && data && (
					<>
						{data.data.statusMachines.map(
							(machine: IStatusMachines) => {
								return (
									<Col
										span={4}
										key={machine.status}
									>
										<OperationStatusComponent
											count={machine.count}
											status={machine.status}
										/>
									</Col>
								);
							}
						)}
					</>
				)}
			</Row>
		</BaseLayout>
	);
}
