import { ThemeProvider, theme, CSSReset } from '@chakra-ui/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
