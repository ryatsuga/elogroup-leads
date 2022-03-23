import React from 'react';
import { SignUp } from './pages/SignUp';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './styles/theme';

function App() {
	return (
		<ChakraProvider theme={theme}>
			<SignUp />
		</ChakraProvider>
	);
}

export default App;
