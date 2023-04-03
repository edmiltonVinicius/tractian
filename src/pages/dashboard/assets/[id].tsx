import { BaseLayout } from '@/components/layout';
import { AssetDetailsListComponent } from '@/components/list-details-asset';
import { VerticalDividerComponent } from '@/components/shared/vertical-divider';
import { GetAssetsByIdService } from '@/services/assets/GetAssetsByIdService';
import { IAsset } from '@/types/interfaces/asset.interface';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { GetServerSideProps } from 'next';
import { Image } from 'antd';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import styles from './assets.module.scss';
import { AssetMetricsComponent } from '@/components/asset-metrics';

type AssetsProps = {
	asset: IAsset | null;
	success: boolean;
	message: string;
};

export const getServerSideProps: GetServerSideProps<AssetsProps> = async (
	ctx
) => {
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

	const { id } = ctx.query;

	if (!id) {
		return {
			props: {
				asset: null,
				success: false,
				message: 'Asset id is not sent! Please send the asset id.',
			},
		};
	}

	try {
		const { data } = await GetAssetsByIdService({ assetId: +id });

		if (!data.length) {
			return {
				notFound: true,
			};
		}

		return {
			props: { asset: data[0], success: true, message: '' },
		};
	} catch (error) {
		return {
			props: {
				asset: null,
				success: false,
				message:
					'Ops... We had a problem for load data. Please, tray again.',
			},
		};
	}
};

export default function PageAssets({ asset, message, success }: AssetsProps) {
	const router = useRouter();

	const goBack = () => {
		router.back();
	};

	return (
		<BaseLayout title={asset ? asset.name : ''}>
			{!success && <p>{message}</p>}

			{!asset && <p>{message}</p>}

			{success && success && asset && (
				<Row className={styles['assets']}>
					<Col span={6}>
						<div className={styles['assets__image']}>
							<Image
								src={asset.image}
								alt={`Image machine ${asset.name}`}
								width={'90%'}
							/>
						</div>

						<h1>{asset.name}</h1>

						<AssetDetailsListComponent asset={asset} />
					</Col>

					<Col span={3}>
						<VerticalDividerComponent />
					</Col>

					<Col span={13}>
						<div className={styles['button-back']}>
							<Button
								ghost
								type="primary"
								icon={<ArrowLeftOutlined />}
								onClick={goBack}
							>
								Go back
							</Button>
						</div>

						<AssetMetricsComponent
							lastUptimeAt={asset.metrics.lastUptimeAt}
							totalCollectsUptime={
								asset.metrics.totalCollectsUptime
							}
							totalUptime={asset.metrics.totalUptime}
						/>
					</Col>
				</Row>
			)}
		</BaseLayout>
	);
}
