import React, { useMemo, useState } from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';
import { DraggableElement } from './DraggableElement';

import { LeadDTO } from '../dtos/LeadDTO';
import { useLeads } from '../hooks/leads';

interface Elements {
	[listKey: string]: LeadDTO[];
}

interface Props {
	data: LeadDTO[];
}

const lists = ['potential_client', 'confirmed_data', 'meeting_scheduled'];

export function DragList({ data }: Props) {
	const [elements, setElements] = useState<Elements>(makeLists());
	const [homeIndex, setHomeIndex] = useState<number | null>(null);
	const { updateLeadStatus } = useLeads();

	console.log(elements);

	function getItems(statusKey: string) {
		return data.filter((item) => item.status === statusKey);
	}

	function makeLists() {
		if (data[0]) {
			const formattedData = lists.reduce(
				(acc, listKey) => ({ ...acc, [listKey]: getItems(listKey) }),
				{}
			);
			return formattedData;
		} else {
			return {};
		}
	}

	function onDragStart(start: any) {
		setHomeIndex(lists.indexOf(start.source.droppableId));
	}

	function onDragEnd(result: any) {
		const { destination, source, draggableId } = result;

		const forwardAllowedIndex =
			lists.indexOf(destination.droppableId) - homeIndex! > 1;
		if (forwardAllowedIndex) {
			return;
		}
		const backwardAllowedIndex =
			homeIndex! > lists.indexOf(destination.droppableId);
		if (backwardAllowedIndex) {
			return;
		}

		setHomeIndex(null);

		if (!destination) return;

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		try {
			const [leadToUpdate] = elements[source.droppableId].filter(
				(item) => item.id === draggableId
			);
			updateLeadStatus(leadToUpdate.id, destination.droppableId);

			if (source.droppableId !== destination.droppableId) {
				const sourceList = elements[source.droppableId];
				const destList = elements[destination.droppableId];
				const sourceItems = [...sourceList];
				const destItems = [...destList];
				const [removed] = sourceItems.splice(source.index, 1);
				destItems.splice(destination.index, 0, removed);
				setElements({
					...elements,
					[source.droppableId]: sourceItems,
					[destination.droppableId]: destItems,
				});
			} else {
				const list = elements[source.droppableId];
				const copiedItems = list;

				const [removed] = copiedItems.splice(source.index, 1);
				copiedItems.splice(destination.index, 0, removed);

				setElements({ ...elements, [source.droppableId]: copiedItems });
			}
		} catch (err) {}
	}

	return (
		<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
			<Grid
				display={'grid'}
				gridTemplateColumns={['1fr', '1fr 1fr 1fr']}
				gridGap={4}
			>
				{data[0] ? (
					lists.map((statusKey, index) => {
						const diference = index - homeIndex!;
						const isDropDisable = index < homeIndex! || diference > 1;
						return (
							<DraggableElement
								isDropDisable={isDropDisable}
								elements={elements[statusKey]}
								key={statusKey}
								prefix={statusKey}
							/>
						);
					})
				) : (
					<GridItem mt={10} colSpan={[1, 4]} textAlign={'center'}>
						Nenhum Lead cadastrado
					</GridItem>
				)}
			</Grid>
		</DragDropContext>
	);
}
