import { Button, Col, Form, Input, message, Row } from 'antd';
import Image from 'next/image';
import nookies from 'nookies';
import { SignInService } from '@/services/signin/SignInService';
import {
	ISignInParams,
	ISignInResponse,
} from '@/types/interfaces/signin.interface';
import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import imageLogin from '../../public/svg/tractian-login.svg';
import style from '../styles/index.module.scss';
import { IResponse } from '@/types/interfaces/api.interface';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { [process.env.KEY_COOKIES as string]: valueCookie } =
		nookies.get(ctx);

	if (valueCookie === (process.env.VALUE_COOKIES as string)) {
		return {
			redirect: {
				destination: '/dashboard',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default function Home() {
	const router = useRouter();
	const [messageSnackBar, contextSnackBar] = message.useMessage();

	const onFinishLogin = async ({ email, password }: ISignInParams) => {
		onLogin({ email, password });
	};

	const { mutate: onLogin, isLoading } = useMutation(
		async ({ email, password }: ISignInParams) =>
			await SignInService({
				email: email,
				password: password,
			}),
		{
			onSuccess() {
				messageSnackBar.open({
					type: 'success',
					content: 'Cool, you are authenticated!',
					duration: 2,
					className: 'snackBarComponent',
				});
				setTimeout(() => {
					router.replace('/dashboard');
				}, 1000);
			},
			onError(error: IResponse<ISignInResponse>) {
				messageSnackBar.open({
					type: 'error',
					content:
						error.errors[0].message ||
						'Ops... There was a problem, please try again.',
					duration: 3,
					className: 'snackBarComponent',
				});
			},
		}
	);

	return (
		<div className={style.container}>
			{contextSnackBar}
			<div className={style.wrapper}>
				<Row className={style.row}>
					<Col
						span={14}
						className={style.columnLogin}
					>
						<Image
							src={imageLogin}
							alt="Picture of the author"
							height={386}
						/>
					</Col>

					<Col
						span={10}
						className={style.columnForm}
					>
						<h1>LOGIN</h1>

						<Form
							name="formLogin"
							wrapperCol={{ span: 24 }}
							initialValues={{ remember: true }}
							onFinish={onFinishLogin}
							autoComplete="off"
							className={style.formLogin}
						>
							<Form.Item
								name="email"
								rules={[
									{
										required: true,
										message:
											'Please input your user email!',
									},
								]}
							>
								<Input
									prefix={
										<UserOutlined
											style={{ color: '#9e9d9d' }}
										/>
									}
									placeholder="Type your user email"
									type="email"
								/>
							</Form.Item>

							<Form.Item
								name="password"
								rules={[
									{
										required: true,
										message: 'Please input your password!',
										min: 6,
									},
								]}
							>
								<Input.Password
									prefix={
										<LockOutlined
											style={{ color: '#9e9d9d' }}
										/>
									}
									placeholder="Now, your password..."
								/>
							</Form.Item>

							<span className={style.dataWaring}>
								Access data was sent to the recruiter.
							</span>

							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									disabled={isLoading}
									size={'large'}
									loading={isLoading}
									block
								>
									{!isLoading && <LoginOutlined />}
									{!isLoading ? 'GO!' : 'Going...'}
								</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</div>
			<div className={style.copyRight}>
				<p>
					Created by Edmilton Vinicius Pansanato - Just for the
					challenge!
				</p>
			</div>
		</div>
	);
}
