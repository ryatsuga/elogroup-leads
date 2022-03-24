import {
	Alert,
	AlertIcon,
	Box,
	Container,
	Stack,
	Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiUser, FiLock } from 'react-icons/fi';
import { ReactComponent as Logo } from '../assets/elogroup-logo.svg';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { UserDTO } from '../dtos/UserDTO';
import apiFake from '../services/apiFake';
import { InputForm } from '../components/Forms/InputForm';
import { Button } from '../components/Button';
import { HttpRequestError } from '../utils/customErrors';
import { useAuth } from '../hooks/auth';

const schema = Yup.object().shape({
	username: Yup.string().required('Informe seu nome de usuário'),
	password: Yup.string().required('Informe sua senha'),
});

export function SignIn() {
	const { signIn } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [requestError, setRequestError] = useState('');
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	async function handleSignIn(form: Partial<UserDTO>) {
		setIsLoading(true);
		const credentials = {
			username: form.username!,
			password: form.password!,
		};
		signIn(credentials)
			.then((res) => {
				reset({
					username: '',
					password: '',
					passwordConfirmation: '',
				});
			})
			.catch((err) => {
				console.log(err);
				if (err instanceof HttpRequestError) {
					setRequestError(err.message);
				} else {
					setRequestError(
						'Ocorreu um erro ao tentar entrar, tente novamente mais tarde'
					);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	return (
		<Container
			display={'flex'}
			flexDirection={'column'}
			height={'100vh'}
			alignItems={'center'}
			justifyContent={'center'}
		>
			{requestError && (
				<Alert status='error' mb={6}>
					<AlertIcon />
					{requestError}
				</Alert>
			)}
			<Box
				width={['95%', '85%']}
				height={['75%', '70%']}
				borderWidth={'1px'}
				paddingX={10}
				paddingY={10}
				backgroundColor={'shape'}
			>
				<form onSubmit={handleSubmit(handleSignIn)}>
					<Stack
						display={'flex'}
						flexDirection={'column'}
						justifyContent={'center'}
						alignItems={'center'}
						spacing={4}
					>
						<Logo style={{ marginBottom: 25 }} />

						<Text as={'h2'} textStyle={'title'} mb={6}>
							Entrar
						</Text>

						<InputForm
							control={control}
							label={'Usuário'}
							name={'username'}
							placeholder={'Usuário'}
							icon={FiUser}
							error={errors.username && errors.username.message}
						/>
						<InputForm
							label={'Senha'}
							control={control}
							name={'password'}
							placeholder={'Senha'}
							icon={FiLock}
							type={'password'}
							error={errors.password && errors.password.message}
						/>
					</Stack>

					<Button
						disabled={isLoading}
						isLoading={isLoading}
						marginTop={8}
						text={'Entrar'}
						type={'submit'}
					/>
				</form>
			</Box>
		</Container>
	);
}
