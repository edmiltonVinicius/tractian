import { BaseLayout } from '@/components/layout';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';

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
	return (
		<BaseLayout>
			<h1>Dashboard</h1>
		</BaseLayout>
	);
}
