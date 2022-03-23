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

		success: '#12A454',
		succes_light: 'rgba(18, 164, 84, 0.5)',

		attention: '#E83F5B',
		attention_light: 'rgba(232, 63, 91, 0.5)',

		shape: '#FFFFFF',
		info: '#1822DC',
		title: '#272727',
		text: '#2B2B2B',
		text_details: '#AD7BT',
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
	},
});

export default theme;
