import { Box, IconButton, Text, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LogoMobile } from '../assets/elogroup-logo-mobile.svg';
import { ReactComponent as Logo } from '../assets/elogroup-logo.svg';
import { useAuth } from '../hooks/auth';

interface Props {
	title: string;
}

export function Header({ title }: Props) {
	const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
	const { signOut } = useAuth();
	let navigate = useNavigate();

	async function handleSignOut() {
		signOut();
	}

	return (
		<Box
			display={'flex'}
			flexDir={'row'}
			w={'100%'}
			alignItems={'center'}
			px={[5, 10]}
			py={3}
			justifyContent={'space-between'}
			as={'nav'}
			bg={'primary'}
		>
			{isLargerThan768 ? <Logo /> : <LogoMobile width={60} />}

			<Text
				as={'div'}
				fontSize={[18, 22]}
				textStyle={'medium'}
				color={'secondary'}
			>
				{title}
			</Text>
			<IconButton
				onClick={handleSignOut}
				aria-label={'SignOut'}
				icon={<FiLogOut />}
			/>
		</Box>
	);
}
