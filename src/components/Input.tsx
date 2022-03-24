import {
	Icon as ChakraIcon,
	InputGroup,
	Input as ChakraInut,
	InputLeftElement,
	InputProps,
} from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons/lib';

interface Props extends InputProps {
	icon?: IconType;
}

export function Input({ icon: Icon, ...rest }: Props) {
	return (
		<InputGroup>
			{Icon && (
				<InputLeftElement
					pointerEvents='none'
					children={<ChakraIcon as={Icon!} color='primary' />}
				/>
			)}
			<ChakraInut
				_focus={{
					boxShadow: '0px 0px 1px 2px rgba(39,39,39,0.85)',
				}}
				borderRadius={0}
				{...rest}
			/>
		</InputGroup>
	);
}
