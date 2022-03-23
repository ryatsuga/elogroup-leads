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
			<ChakraInut {...rest} />
		</InputGroup>
	);
}
