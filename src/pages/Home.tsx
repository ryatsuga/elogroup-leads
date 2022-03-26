import React, { useEffect } from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import { Navbar } from '../components/Navbar';
import { DragList } from '../components/DragList';
import { leadsData } from '../utils/sampleData';
import { OpacityButton } from '../components/OpacityButton';
import { useNavigate } from 'react-router';
import { useLeads } from '../hooks/leads';

export function Home() {
	const { leads, resetLeadsStatus } = useLeads();
	const navigate = useNavigate();

	useEffect(() => {
		// Make the manual tests easy
		// resetLeadsStatus();
	}, []);

	return (
		<Flex flexDir={'column'}>
			<Navbar title={'Painel de Leads'} />
			<Container
				maxW={'auto'}
				w={'100vw'}
				px={[6, 10, 40]}
				mt={10}
				color={'primary'}
			>
				<Box w={'45%'} mb={5}>
					<OpacityButton
						onClick={() => navigate('/new-lead')}
						px={20}
						py={8}
						text={'Novo Lead (+)'}
					/>
				</Box>

				<DragList data={leads} />
			</Container>
		</Flex>
	);
}
