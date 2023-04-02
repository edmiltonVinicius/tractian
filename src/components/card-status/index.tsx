import { IListStatus } from '@/types/interfaces/status.interface';
import styles from './card-status.module.scss';
import Image from 'next/image';
import { FireOutlined } from '@ant-design/icons';
import { MachineStatusDisplayEnum } from '@/types/enum/machine-status.enum';
import Link from 'next/link';

export const CardStatusComponent = ({
	id,
	name,
	healthscore,
	image,
	model,
	status,
}: IListStatus) => {
	return (
		<Link href={`/dashboard/assets/${id}`}>
			<div className={styles['card-status']}>
				<div className={styles['card-status__image']}>
					<Image
						src={image}
						alt={`Image to ${name} asset`}
						width={70}
						height={70}
						className={styles['image']}
					/>
				</div>

				<div className={styles['card-status__details']}>
					<h3>{name}</h3>
					<h4>{model}</h4>

					<div className={styles['card-status__footer']}>
						<div className={styles['health-score']}>
							<FireOutlined />
							<span>{healthscore}%</span>
						</div>

						<span
							className={`${styles['status']} ${styles[status]}`}
						>
							{MachineStatusDisplayEnum[status]}
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
};
