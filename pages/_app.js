import { useEffect } from 'react'
import { UserProvider } from '@auth0/nextjs-auth0'
import { ThemeProvider, CSSReset } from '@chakra-ui/react'
import { customTheme } from '../custom-theme'
import { Fonts } from '../fonts'
import '../styles/globals.css'

import { InitializeAnalytics } from '../utils/analytics'

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		try {
			InitializeAnalytics()
		} catch (err) {
			console.error(err)
		}
	}, [])
	return (
		<ThemeProvider theme={customTheme}>
			<UserProvider>
				<CSSReset />
				<Fonts />
				<Component {...pageProps} />
			</UserProvider>
		</ThemeProvider>
	)
}

export default MyApp
