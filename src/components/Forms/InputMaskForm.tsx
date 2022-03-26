import React from 'react';
import {
	InputProps,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
} from '@chakra-ui/react';
import { Control, Controller } from 'react-hook-form';
import { IconType } from 'react-icons/lib';
import { InputMask } from '../InputMask';

interface Props extends InputProps {
	control: Control;
	name: string;
	label?: string;
	icon?: IconType;
	error?: string;
	helperText?: string;
	mask?: string;
}

export function InputMaskForm({
	control,
	label,
	icon: Icon,
	error,
	name,
	helperText,
	mask,
	...rest
}: Props) {
	return (
		<FormControl isInvalid={!!error}>
			{label && <FormLabel htmlFor={name}>{label}</FormLabel>}
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value } }) => (
					<InputMask
						mask={mask}
						onChange={onChange}
						value={value || ''}
						icon={Icon}
						{...rest}
					/>
				)}
			/>
			{error ? (
				<FormErrorMessage as={'p'} color={'attention'}>
					{error}
				</FormErrorMessage>
			) : (
				<FormHelperText as={'p'}>{helperText}</FormHelperText>
			)}
		</FormControl>
	);
}
