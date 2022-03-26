import React from 'react';
import ReactInputMask from 'react-input-mask';
import {
	Icon as ChakraIcon,
	InputGroup,
	Input as ChakraInut,
	InputLeftElement,
	InputProps,
} from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

interface Props extends InputProps {
	icon?: IconType;
	mask?: string;
}

export function InputMask({ icon: Icon, mask, ...rest }: Props) {
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
				as={ReactInputMask}
				mask={mask}
				bg={'shape'}
				{...rest}
			/>
		</InputGroup>
	);
}
