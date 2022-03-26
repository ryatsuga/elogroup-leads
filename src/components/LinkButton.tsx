import React from 'react';
import { LinkProps, Link as ChakraLink } from '@chakra-ui/react';

interface Props extends LinkProps {
	text: string;
}

export function LinkButton({ text, ...rest }: Props) {
	return (
		<ChakraLink
			transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
			border='2px'
			px='8px'
			py='8px'
			fontSize='14px'
			fontWeight='semibold'
			bg='shape'
			borderColor='primary'
			color='primary'
			textAlign={'center'}
			alignItems={'center'}
			justifyContent={'center'}
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
		</ChakraLink>
	);
}
