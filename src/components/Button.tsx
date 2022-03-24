import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react';
import React from 'react';

interface Props extends ButtonProps {
	text: string;
}

export function Button({ text, ...rest }: Props) {
	return (
		<ChakraButton
			transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
			w={'100%'}
			border='2px'
			px='8px'
			fontSize='14px'
			fontWeight='semibold'
			bg='shape'
			borderColor='primary'
			color='primary'
			_hover={{ bg: 'primary', color: 'shape' }}
			_active={{
				bg: 'primary',
				transform: 'scale(0.98)',
			}}
			_focus={{
				boxShadow: '0px 0px 1px 2px rgba(39,39,39,0.85)',
			}}
			borderRadius={0}
			cursor={'pointer'}
			{...rest}
		>
			{text}
		</ChakraButton>
	);
}
