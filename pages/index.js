import { Box } from '@chakra-ui/react';

import Head from 'next/head';
import Navbar from './components/navbar';
import Hero from './components/hero';

import styles from '../styles/Home.module.css';
import Comparison from './components/comparison';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Box
				d='flex'
				flex='1'
				flexDirection='column'
				justifyContent='start'
				alignItems='center'
				width='100%'
				backgroundColor='#f8f9fb'>
				<Navbar />
				<Hero />
				<Comparison />
			</Box>

			<footer className={styles.footer}>
				<a
					href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
					target='_blank'
					rel='noopener noreferrer'>
					Powered by{' '}
					<img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
				</a>
				<script
					defer
					src='https://static.cloudflareinsights.com/beacon.min.js'
					data-cf-beacon='{"token": "c79b12b941ff4b8a9bedaa86f7060de0"}'></script>
			</footer>
		</div>
	);
}
