import { useEffect } from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/react';
import { customTheme } from '../custom-theme';
import { Fonts } from '../fonts';
import '../styles/globals.css';

import { InitializeAnalytics } from '../utils/analytics.js';

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		try {
			InitializeAnalytics();
		} catch (err) {
			console.log(err);
		}
	}, []);
	return (
		<ThemeProvider theme={customTheme}>
			<CSSReset />
			<Fonts />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
