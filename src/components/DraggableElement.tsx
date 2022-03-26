import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd';
import ListItem from './ListItem';

interface Props {
	prefix: string;
	elements: any[];
	isDropDisable: boolean;
}

const titles = [
	{ key: 'potential_client', text: 'Cliente em Potencial' },
	{ key: 'confirmed_data', text: 'Dados confirmados' },
	{ key: 'meeting_scheduled', text: 'Reunião Agendada' },
];

export function DraggableElement({ prefix, elements, isDropDisable }: Props) {
	const [title] = titles.filter((item) => item.key === prefix);

	return (
		<Box mb={'auto'}>
			<Container
				textAlign={'center'}
				textStyle={'title2'}
				py={5}
				bg={'primary_light'}
				textTransform={'uppercase'}
			>
				{title.text}
			</Container>
			<Droppable droppableId={`${prefix}`}>
				{(provided, snapshot) => (
					<Container
						display={'flex'}
						flexDir={'column'}
						minH={[100, 150]}
						py={5}
						bg={
							snapshot.isDraggingOver && !isDropDisable
								? 'success_light'
								: snapshot.isDraggingOver && isDropDisable
								? 'attention_light'
								: 'shape'
						}
						h={'100%'}
						gap={2}
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{elements.map((item, index) => (
							<ListItem key={item.id} item={item} index={index} />
						))}
						{provided.placeholder}
					</Container>
				)}
			</Droppable>
		</Box>
	);
}
