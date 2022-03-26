import React from 'react';
import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { CgArrowLongLeft } from 'react-icons/cg';

interface Props extends ButtonProps {
	to: string;
}

export function BackButton({ to, ...rest }: Props) {
	const navigate = useNavigate();

	return (
		<ChakraButton
			transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
			fontSize={40}
			fontWeight='semibold'
			bg='transparent'
			color='primary'
			p={0}
			ml={-2}
			_hover={{ opacity: 0.8 }}
			_active={{
				transform: 'scale(0.98)',
			}}
			_focus={{
				boxShadow: 'none',
			}}
			onClick={() => navigate(to)}
			borderRadius={0}
			cursor={'pointer'}
			rightIcon={<CgArrowLongLeft />}
			{...rest}
		/>
	);
}
