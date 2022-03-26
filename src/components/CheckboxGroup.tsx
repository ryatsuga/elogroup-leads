import React, { useState } from 'react';
import {
	CheckboxGroupProps,
	CheckboxGroup as ChakraCheckboxGroup,
	Stack,
	Divider,
} from '@chakra-ui/react';
import { Checkbox } from './Checkbox';

interface Props extends CheckboxGroupProps {
	options: string[];
	setValues: (values: string[]) => void;
}

export function CheckboxGroup({ options, setValues, ...rest }: Props) {
	const [checkedItems, setCheckedItems] = useState<string[]>([]);

	const allChecked = checkedItems.length === options.length;
	const isIndeterminate = !allChecked;

	function handleCheckboxToggle(op: string) {
		if (checkedItems.includes(op)) {
			const updatedCheckedItems = checkedItems.filter((item) => item !== op);
			setCheckedItems(updatedCheckedItems);
			setValues(checkedItems);
		} else {
			setCheckedItems([...checkedItems, op]);
			setValues(checkedItems);
		}
	}

	return (
		<ChakraCheckboxGroup {...rest}>
			<Checkbox
				text={'Todas as opções'}
				isChecked={allChecked}
				isIndeterminate={isIndeterminate}
				onChange={(e) => {
					if (allChecked) {
						setCheckedItems([]);
					} else {
						setCheckedItems(options);
					}
				}}
			/>
			<Divider mb={4} />
			<Stack gap={2}>
				{options.map((op) => (
					<Checkbox
						key={op}
						onChange={(e) => handleCheckboxToggle(op)}
						isChecked={checkedItems.includes(op)}
						text={op}
					/>
				))}
			</Stack>
		</ChakraCheckboxGroup>
	);
}
