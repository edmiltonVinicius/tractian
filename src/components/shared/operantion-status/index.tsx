import { Space } from 'antd';
import {
	MachineStatusDisplayEnum,
	MachineStatusEnum,
} from '@/types/enum/machine-status.enum';
import styles from './operation-status.module.scss';
import {
	CheckCircleOutlined,
	ExclamationCircleOutlined,
	PauseCircleOutlined,
	StopOutlined,
} from '@ant-design/icons';

type OperationStatusProps = {
	status: MachineStatusEnum;
	count: number;
};

export const OperationStatusComponent = ({
	status,
	count,
}: OperationStatusProps) => {
	const statusName = MachineStatusDisplayEnum[status];

	return (
		<Space className={styles['operation-status']}>
			<h3 className={styles['operation-status__title']}>{statusName}</h3>

			<div className={styles['operation-status__content']}>
				{status === MachineStatusEnum.OPERATION && (
					<CheckCircleOutlined
						style={{ color: '#479337', fontSize: '33px' }}
					/>
				)}

				{status === MachineStatusEnum.ALERT && (
					<ExclamationCircleOutlined
						style={{ color: '#a53430', fontSize: '33px' }}
					/>
				)}

				{status === MachineStatusEnum.DOWN_TIME && (
					<StopOutlined
						style={{ color: '#959595', fontSize: '33px' }}
					/>
				)}

				{status === MachineStatusEnum.PLANNED_STOP && (
					<PauseCircleOutlined
						style={{ color: '#62b8b8', fontSize: '33px' }}
					/>
				)}

				{status === MachineStatusEnum.UNPLANNED_STOP && (
					<PauseCircleOutlined
						style={{ color: '#cdad6f', fontSize: '33px' }}
					/>
				)}

				<p className={styles['operation-status__content__count']}>
					{count}
				</p>
			</div>
		</Space>
	);
};
