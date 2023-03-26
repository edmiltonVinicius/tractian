import Image from 'next/image';
import { Col, Row, Button, Checkbox, Form, Input } from 'antd';

import style from './index.module.scss';
import imageLogin from '../../public/svg/tractian-login.svg';
import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function Home() {
	const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

	const onFinishLogin = (values: any) => {
		setIsLoggingIn(true);
		console.log('values: ', values);
	};

	return (
		<div className={style.container}>
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
								name="userEmail"
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
								name="userPassword"
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
									disabled={isLoggingIn}
									size={'large'}
									loading={isLoggingIn}
									block
								>
									{!isLoggingIn && <LoginOutlined />}
									{!isLoggingIn ? 'GO!' : 'Going...'}
								</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</div>
			<div className={style.copyRight}>
				<p>
					Created by Edmilton Vinicius Pansanato - Just for challenge!
				</p>
			</div>
		</div>
	);
}
