import {
	Alert,
	AlertIcon,
	Box,
	Button,
	Container,
	Stack,
	Text,
} from '@chakra-ui/react';
import { Input } from '../components/Input';
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

const schema = Yup.object().shape({
	username: Yup.string().required('Nome de usuário é obrigatório'),
	password: Yup.string().required('Senha é obrigatória'),
	passwordConfirmation: Yup.string()
		.required('Confirmação de senha é obrigatória')
		.oneOf([Yup.ref('password')], 'A senha de confirmação não confere'),
});

export function SignUp() {
	const [requestError, setRequestError] = useState(false);
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	function handleRegister(form: Partial<UserDTO>) {
		const newUser = {
			id: String(uuidv4()),
			username: form.username!,
			password: form.password!,
			createdAt: new Date(),
		};

		try {
			const user = apiFake.signUp(newUser);
			console.log(user);
			reset({
				username: '',
				password: '',
				passwordConfirmation: '',
			});
		} catch (error) {
			console.log(error);
			setRequestError(true);
		}
	}

	return (
		<Container
			display={'flex'}
			height={'100vh'}
			alignItems={'center'}
			justifyContent={'center'}
		>
			<Box
				width={['95%', '85%']}
				height={['75%', '70%']}
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
						{requestError && (
							<Alert status='error' mb={6}>
								<AlertIcon />
								Ocorreu um erro ao tentar registrar, tente novamente mais tarde
							</Alert>
						)}

						<Text as={'h2'} textStyle={'title'} mb={6}>
							Registre-se
						</Text>

						<InputForm
							control={control}
							label={'Usuário*'}
							name={'username'}
							placeholder={'Usuário'}
							icon={FiUser}
							error={errors.username && errors.username.message}
						/>
						<InputForm
							label={'Senha*'}
							control={control}
							name={'password'}
							placeholder={'Senha'}
							icon={FiLock}
							type={'password'}
							error={errors.password && errors.password.message}
						/>
						<InputForm
							control={control}
							label={'Confirme sua senha*'}
							name={'passwordConfirmation'}
							placeholder={'Confirme sua senha'}
							icon={FiLock}
							type={'password'}
							error={
								errors.passwordConfirmation &&
								errors.passwordConfirmation.message
							}
						/>
					</Stack>
					<Button type={'submit'} marginTop={8} w={'100%'}>
						Registrar
					</Button>
				</form>
			</Box>
		</Container>
	);
}
