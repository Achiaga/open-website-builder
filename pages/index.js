import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from '../hooks/translation';

import { Box, Heading, Text, Image, Badge } from '@chakra-ui/react';
import styles from '../styles/Home.module.css';

function AirbnbExample() {
	const property = {
		imageUrl: 'https://bit.ly/2Z4KKcF',
		imageAlt: 'Rear view of modern home with pool',
		beds: 3,
		baths: 2,
		title: 'Modern home in city center in the heart of historic Los Angeles',
		formattedPrice: '$1,900.00',
		reviewCount: 34,
		rating: 4,
	};

	return (
		<Box
			marginBottom='10'
			maxW='sm'
			border='1px'
			borderColor='gray.200'
			borderRadius='lg'
			overflow='hidden'>
			<Image src={property.imageUrl} alt={property.imageAlt} />

			<Box p='6'>
				<Box d='flex' alignItems='baseline'>
					<Badge borderRadius='full' px='2' colorScheme='teal'>
						New
					</Badge>
					<Box
						color='gray.500'
						fontWeight='semibold'
						letterSpacing='wide'
						fontSize='xs'
						textTransform='uppercase'
						ml='2'>
						{property.beds} beds &bull; {property.baths} baths
					</Box>
				</Box>

				<Box
					mt='1'
					fontWeight='semibold'
					as='h4'
					lineHeight='tight'
					isTruncated>
					{property.title}
				</Box>

				<Box>
					{property.formattedPrice}
					<Box as='span' color='gray.600' fontSize='sm'>
						/ wk
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default function Home() {
	const router = useRouter();
	const { locale } = router;
	const [t] = useTranslation();

	const changeLanguage = (e) => {
		const locale = e.target.value;
		router.push(router.pathname, router.asPath, { locale });
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<select
					onChange={changeLanguage}
					defaultValue={locale}
					className='text-white text-shadow-sm text-lg bg-transparent tracking-wide'>
					<option className='text-black' value='en'>
						EN
					</option>
					<option className='text-black' value='es'>
						ES
					</option>
				</select>
				<Heading fontFamily='Raleway' as='h1' size='2xl' mb='2'>
					{t.welcome.title}
				</Heading>
				<Text
					bgGradient='linear(to-l, #7928CA,#FF0080)'
					bgClip='text'
					fontSize='6xl'
					fontFamily='Big Shoulders Display'>
					{t.welcome.title2}
				</Text>

				<AirbnbExample />
			</main>

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
