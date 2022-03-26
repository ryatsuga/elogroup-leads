import React, { useState } from 'react';
import {
	Text,
	Container,
	Flex,
	Grid,
	GridItem,
	Stack,
	Alert,
	AlertIcon,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import { Navbar } from '../components/Navbar';
import { useNavigate } from 'react-router';
import { InputForm } from '../components/Forms/InputForm';
import { CheckboxGroup } from '../components/CheckboxGroup';
import { opportunities as opportunitiesData } from '../utils/opportunities';
import { useLeads } from '../hooks/leads';
import { LeadDTO } from '../dtos/LeadDTO';
import { useAuth } from '../hooks/auth';
import { Button } from '../components/Button';
import { InputMaskForm } from '../components/Forms/InputMaskForm';
import { BackButton } from '../components/BackButton';

const schema = Yup.object().shape({
	name: Yup.string().required('Nome do lead é obrigatório '),
	contact: Yup.string()
		.required('Telefone do lead é obrigatório')
		.matches(
			/\(?\d{2,}\)?[ -]?\d{4,}[\-\s]?\d{4}/,
			'Formato de telefone inválido'
		),
	email: Yup.string()
		.required('E-mail do lead é obrigatório')
		.email('Formato de e-mail inválido'),
});

export function NewLead() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [requestError, setRequestError] = useState('');
	const [opportunities, setOpportunities] = useState<string[]>([]);
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const { createLead } = useLeads();
	const { user } = useAuth();

	function handleLeadRegister(form: Partial<LeadDTO>) {
		try {
			setIsLoading(true);
			if (!opportunities[0]) {
				throw new Error('Necessário selecionar ao menos uma oportunidade');
			}
			const lead = {
				id: String(uuidv4()),
				name: form.name!,
				contact: form.contact!,
				email: form.email!,
				opportunities,
				status: 'potential_client',
				createdBy: user.id,
				createdAt: new Date(),
			};

			createLead(lead);
			reset();
			navigate('/home');
		} catch (err: any) {
			setRequestError(err.message);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Flex flexDir={'column'}>
			<Navbar title={'Novo Lead'} />
			<Container
				maxW={'auto'}
				w={'100vw'}
				px={[6, 10, 40]}
				mt={2}
				color={'primary'}
			>
				<Flex my={4} justifyContent={'flex-start'}>
					<BackButton to={'/home'} />
				</Flex>
				{requestError && (
					<Alert status='error' mb={6}>
						<AlertIcon />
						{requestError}
					</Alert>
				)}
				<form onSubmit={handleSubmit(handleLeadRegister)}>
					<Grid columnGap={10} rowGap={6} templateColumns={['1fr', '1fr 1fr']}>
						<GridItem>
							<Text as={'h2'} textStyle={'title'} mb={6}>
								Dados básicos
							</Text>
							<Stack spacing={4}>
								<InputForm
									control={control}
									label={'Nome*'}
									name={'name'}
									placeholder={'Nome do lead'}
									error={errors.name && errors.name.message}
								/>
								<InputMaskForm
									control={control}
									label={'Telefone*'}
									name={'contact'}
									mask={'(99) 99999-9999'}
									placeholder={'Telefone do lead'}
									error={errors.contact && errors.contact.message}
								/>
								<InputForm
									control={control}
									label={'E-mail*'}
									name={'email'}
									placeholder={'E-mail do lead'}
									error={errors.email && errors.email.message}
								/>
							</Stack>
						</GridItem>
						<GridItem>
							<Text as={'h2'} textStyle={'title'} mb={6}>
								Oportunidades
							</Text>

							<CheckboxGroup
								setValues={setOpportunities}
								options={opportunitiesData}
							/>
						</GridItem>
					</Grid>
					<Flex mt={8} justifyContent={['center', 'flex-end']}>
						<Button
							disabled={isLoading}
							isLoading={isLoading}
							type={'submit'}
							w={['100%', '45%']}
							text='Cadastrar'
						/>
					</Flex>
				</form>
			</Container>
		</Flex>
	);
}
