import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Header } from '../components/Header';

export function Home() {
	return (
		<Flex>
			<Header title={'Painel de Leads'} />
		</Flex>
	);
}
