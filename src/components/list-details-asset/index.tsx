import { IAsset } from '@/types/interfaces/asset.interface';
import { SettingOutlined } from '@ant-design/icons';
import { ItemDetailAssetComponent } from '../item-detail-asset';

type AssetDetailsListComponentProps = {
	asset: IAsset;
};

export const AssetDetailsListComponent = ({
	asset,
}: AssetDetailsListComponentProps) => {
	return (
		<>
			<ItemDetailAssetComponent
				icon={<SettingOutlined />}
				title={'Sensor'}
				value={asset.sensors.join(',')}
				valueInSameLine={true}
				key={'sensor'}
			/>

			<ItemDetailAssetComponent
				icon={<SettingOutlined />}
				title={'Model'}
				value={asset.model}
				valueInSameLine={true}
				key={'model'}
			/>

			<ItemDetailAssetComponent
				icon={<SettingOutlined />}
				title={'Metric - Maximum temperature'}
				value={
					asset.specifications.maxTemp
						? asset.specifications.maxTemp.toString() + ' ºc'
						: '-'
				}
				valueInSameLine={true}
				key={'metric maximum temperature'}
			/>

			<ItemDetailAssetComponent
				icon={<SettingOutlined />}
				title={'Metric - Power'}
				value={
					asset.specifications.power
						? asset.specifications.power.toString() + ' ºc'
						: '-'
				}
				valueInSameLine={true}
				key={'metric power'}
			/>

			<ItemDetailAssetComponent
				icon={<SettingOutlined />}
				title={'Metric - RRM'}
				value={
					asset.specifications.rpm
						? asset.specifications.rpm.toString() + ' ºc'
						: '-'
				}
				valueInSameLine={true}
				key={'metric rpm'}
			/>

			<ItemDetailAssetComponent
				icon={<SettingOutlined />}
				title={'Health score'}
				value={asset.healthscore.toString() + '%'}
				valueInSameLine={true}
				key={'healthscore'}
			/>
		</>
	);
};
