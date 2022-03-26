import { Flex, Box, Text, Stack } from '@chakra-ui/react';
import React from 'react';
import { ReactComponent as Logo } from '../assets/elogroup-logo.svg';
import { LinkButton } from '../components/LinkButton';

export function Landing() {
	return (
		<Flex flexDirection={['column', 'row']} h={'100vh'}>
			<Box
				display={'flex'}
				flexDir={'column'}
				w={['100vw', '60%']}
				h={['45%', '100vh']}
				justifyContent={'center'}
				alignItems={'center'}
				bg={'primary'}
				px={5}
				py={10}
			>
				<Logo transform='scale(1.5)' />
				<Text
					as={'h1'}
					color={'secondary'}
					fontSize={'30px'}
					textStyle={'title2'}
					mt={10}
				>
					PLATAFORMA DE
					<Text
						as={'p'}
						color={'shape'}
						fontSize={'20px'}
						textStyle={'regular'}
					>
						Cadastro de Leads
					</Text>
				</Text>
			</Box>
			<Box
				display={'flex'}
				flexDir={'column'}
				w={['100vw', '40%']}
				h={['55%', '100vh']}
				justifyContent={'center'}
				alignItems={'center'}
				px={5}
				py={10}
			>
				<Text
					as={'h1'}
					color={'primary'}
					fontSize={'30px'}
					textStyle={'bold'}
					mb={10}
				>
					SEJA BEM-VINDO
				</Text>
				<Stack w={'100%'} gap={1}>
					<LinkButton href={'/sign-in'} text={'Entrar'} />
					<LinkButton href={'/sign-up'} text={'Registrar'} />
				</Stack>
			</Box>
		</Flex>
	);
}
