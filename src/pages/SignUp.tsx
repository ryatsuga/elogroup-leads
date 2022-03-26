import React, { useState } from 'react';
import {
	Alert,
	AlertIcon,
	Box,
	Container,
	Flex,
	Stack,
	Text,
} from '@chakra-ui/react';
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
import { BackButton } from '../components/BackButton';
import { useNavigate } from 'react-router';

const schema = Yup.object().shape({
	username: Yup.string()
		.required('Nome de usuário é obrigatório')
		.matches(
			/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
			'Deve ter no minímo 3 caracteres, não deve conter espaço nem caracter especial'
		),
	password: Yup.string()
		.required('Senha é obrigatória')
		.matches(
			/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
			'Deve ter no minímo 8 caracteres, conter ao menos um caractere especial, uma letra e um número'
		),
	passwordConfirmation: Yup.string()
		.required('Confirmação de senha é obrigatória')
		.oneOf([Yup.ref('password')], 'A senha de confirmação não confere'),
});

export function SignUp() {
	const [isLoading, setIsLoading] = useState(false);
	const [requestError, setRequestError] = useState('');
	const navigate = useNavigate();
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	async function handleRegister(form: Partial<UserDTO>) {
		setIsLoading(true);
		const newUser = {
			id: String(uuidv4()),
			username: form.username!,
			password: form.password!,
			createdAt: new Date(),
		};
		apiFake
			.signUp(newUser)
			.then((res) => {
				console.log(res);
				reset({
					username: '',
					password: '',
					passwordConfirmation: '',
				});
				navigate('/sign-in');
			})
			.catch((err) => {
				console.log(err);
				if (err instanceof HttpRequestError) {
					setRequestError(err.message);
				} else {
					setRequestError(
						'Ocorreu um erro ao tentar registrar, tente novamente mais tarde'
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
			<Flex top={[4, 8]} left={[4, 20, 40]} position={'absolute'}>
				<BackButton to={'/'} />
			</Flex>
			{requestError && (
				<Alert status='error' mb={6}>
					<AlertIcon />
					{requestError}
				</Alert>
			)}
			<Box
				width={['95%', '85%']}
				height={['75%', 'auto']}
				borderWidth={'1px'}
				paddingX={10}
				paddingY={10}
				backgroundColor={'shape'}
			>
				<form onSubmit={handleSubmit(handleRegister)}>
					<Stack
						display={'flex'}
						flexDirection={'column'}
						justifyContent={'center'}
						alignItems={'center'}
						spacing={4}
					>
						<Logo style={{ marginBottom: 25 }} />

						<Text as={'h2'} textStyle={'title'} mb={6}>
							Registre-se
						</Text>

						<InputForm
							control={control}
							label={'Usuário*'}
							name={'username'}
							placeholder={'Usuário'}
							helperText={
								'Deve ter no minímo 3 caracteres, não deve conter espaço nem caracter especial'
							}
							icon={FiUser}
							error={errors.username && errors.username.message}
						/>
						<InputForm
							label={'Senha*'}
							control={control}
							name={'password'}
							placeholder={'Senha'}
							helperText={
								'Deve ter no minímo 8 caracteres, conter ao menos, um caracter especial, uma letra e um número'
							}
							icon={FiLock}
							type={'password'}
							error={errors.password && errors.password.message}
						/>
						<InputForm
							control={control}
							label={'Confirme sua senha*'}
							name={'passwordConfirmation'}
							placeholder={'Confirme sua senha'}
							helperText={'Repita a senha digitada anteriormente'}
							icon={FiLock}
							type={'password'}
							error={
								errors.passwordConfirmation &&
								errors.passwordConfirmation.message
							}
						/>
					</Stack>

					<Button
						disabled={isLoading}
						isLoading={isLoading}
						marginTop={8}
						w={'100%'}
						text={'Registrar'}
						type={'submit'}
					/>
				</form>
			</Box>
		</Container>
	);
}
