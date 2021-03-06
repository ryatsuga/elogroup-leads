import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	styles: {
		global: {
			body: {
				backgroundColor: '#F8F8F8',
			},
		},
	},
	colors: {
		primary: '#272727',
		secondary: '#F8F8F8',

		primary_light: '#E3E3E3',

		success: '#12A454',
		success_light: 'rgba(18, 164, 84, 0.5)',

		attention: '#E83F5B',
		attention_light: 'rgba(232, 63, 91, 0.5)',

		shape: '#FFFFFF',
		info: '#1822DC',
	},
	fonts: {
		body: 'Roboto',
	},
	textStyles: {
		title: {
			fontFamily: 'Roboto',
			fontWeight: 700,
			color: '#272727',
			fontSize: ['18px', '24px'],
		},
		bold: {
			fontFamily: 'Roboto',
			fontWeight: 700,
		},
		regular: {
			fontFamily: 'Roboto',
			fontWeight: 400,
		},
		medium: {
			fontFamily: 'Roboto',
			fontWeight: 500,
		},
		title2: {
			fontFamily: 'Fjalla One',
			fontWeight: 400,
		},
	},
});

export default theme;
