import { Box } from '@chakra-ui/react'

import Head from 'next/head'
import Navbar from './components/navbar'
import Hero from './components/hero'
import Comparison from './components/comparison'
import Features from './components/features'
import Footer from './components/footer'

export default function Home() {
	return (
		<Box
			minHeight='100vh'
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
			maxWidth='100vw'>
			<Head>
				<meta
					name='google-site-verification'
					content='UadvCpBK-LYrfPuloDtGWCqlJeQKDZUy3XtQH0wOZ8E'
				/>
				<title>Standout Resume</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Box
				d='flex'
				flex='1'
				flexDirection='column'
				justifyContent='start'
				alignItems='center'
				width='100%'>
				<Navbar />
				<Hero />
				<Comparison />
				<Features />
				<Footer />
			</Box>
		</Box>
	)
}
