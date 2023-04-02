import { Divider } from 'antd';
import styles from './vertical-divider.module.scss';

export const VerticalDividerComponent = () => {
	return (
		<Divider
			type="vertical"
			className={styles['vertical-divider']}
		/>
	);
};
