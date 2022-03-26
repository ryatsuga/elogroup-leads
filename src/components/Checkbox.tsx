import React from 'react';
import { CheckboxProps, Checkbox as ChakraCheckbox } from '@chakra-ui/react';

interface Props extends CheckboxProps {
	text: string;
}

export function Checkbox({ text, ...rest }: Props) {
	return (
		<ChakraCheckbox
			transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
			colorScheme={'gray'}
			borderRadius={0}
			{...rest}
		>
			{text}
		</ChakraCheckbox>
	);
}
