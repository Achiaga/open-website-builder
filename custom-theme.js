import { theme } from '@chakra-ui/react';

export const customTheme = {
	...theme,
	colors: {
		...theme.colors,
		primary: {
			100: '',
			200: '',
			300: '',
			400: '',
			500: '#506BF0',
			600: '',
			700: '',
			800: '',
			900: '',
		},
		gray: {
			600: '#8A95A5',
		},
		red: {
			400: '#FB1164',
		},
		green: {
			400: '#43E28E',
		},
	},
	fonts: {
		...theme.fonts,
		body: 'Raleway',
	},
};
