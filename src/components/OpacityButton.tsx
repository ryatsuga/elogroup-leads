import React from 'react';
import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react';

interface Props extends ButtonProps {
	text: string;
}

export function OpacityButton({ text, ...rest }: Props) {
	return (
		<ChakraButton
			transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
			w={'100%'}
			px='8px'
			fontSize='14px'
			fontWeight='semibold'
			bg='primary'
			color='secondary'
			_hover={{ opacity: 0.8 }}
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
