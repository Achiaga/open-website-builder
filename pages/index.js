import { Box } from '@chakra-ui/react';

import Head from 'next/head';
import Navbar from './components/navbar';
import Hero from './components/hero';
import Comparison from './components/comparison';
import Features from './components/features';
import Footer from './components/footer';

import styles from '../styles/Home.module.css';

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
				<Features />
				<Footer />
			</Box>
		</div>
	);
}
