import { ReactNode } from 'react';
import styles from './item-detail-asset.module.scss';

type ItemDetailAssetComponentProps = {
	icon: ReactNode;
	title: string;
	value: string;
	valueInSameLine: boolean;
};

export const ItemDetailAssetComponent = ({
	icon,
	title,
	value,
	valueInSameLine,
}: ItemDetailAssetComponentProps) => {
	return (
		<div className={styles['item-detail-asset']}>
			<div className={styles['icon']}>{icon}</div>

			{valueInSameLine && (
				<div className={styles['same-line']}>
					<p className={styles['title']}>{title}</p>
					<p className={styles['value']}>{value}</p>
				</div>
			)}

			{/* {!valueInSameLine && (
				<div className={styles['same-line']}>
					<p className={styles['title']}>{title}</p>
					<p className={styles['value--same-line']}>{value}</p>
				</div>
			)} */}
		</div>
	);
};
