import React from 'react';
import { Container } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
	item: any;
	index: any;
}

const ListItem = ({ item, index }: Props) => {
	return (
		<Draggable draggableId={item.id} index={index}>
			{(provided, snapshot) => {
				return (
					<Container
						as={'div'}
						textAlign={'center'}
						py={3}
						borderColor={'primary'}
						borderWidth={'2px'}
						color={snapshot.isDragging ? 'secondary' : 'primary'}
						bg={snapshot.isDragging ? 'primary' : 'shape'}
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						<Container>{item.name}</Container>
					</Container>
				);
			}}
		</Draggable>
	);
};

export default ListItem;
