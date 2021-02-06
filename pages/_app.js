import { ThemeProvider, CSSReset } from '@chakra-ui/react';
import '../styles/globals.css';
import { customTheme } from '../custom-theme';
import { Fonts } from '../fonts';

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={customTheme}>
			<CSSReset />
			<Fonts />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
