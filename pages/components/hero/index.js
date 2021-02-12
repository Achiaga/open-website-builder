import Image from 'next/image';
import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from '../../../hooks/translation';

import Button from '../../../Components/Button';

const Hero = () => {
	const [t] = useTranslation();

	return (
		<Box
			display='flex'
			justifyContent='space-between'
			alignItems='center'
			width='100%'
			marginTop='1.25rem'
			marginBottom='6.5rem'>
			<Box
				display='flex'
				flexDirection='column'
				alignItems='baseline'
				justifyContent='center'
				marginLeft='6.5rem'
				width='30%'
				marginTop='2rem'>
				<Text
					width='426px'
					fontWeight='bold'
					color='black'
					fontFamily='Montserrat'
					fontSize='50px'
					lineHeight='60px'>
					{t.hero.title_1}
					<Text as='span' color='primary.500'>
						{t.hero.title_color_2}
						<br />
					</Text>
					{t.hero.title_3}
				</Text>
				<Text
					color='gray.600'
					marginTop='1.25rem'
					fontFamily='Montserrat'
					fontSize='24px'
					as='span'>
					{t.hero.subtitle}
				</Text>
				<Button padding='1.5rem' marginTop='1.5rem'>
					{t.hero.button}
				</Button>
			</Box>
			<Box
				position='relative'
				width='60%'
				display='flex'
				alignItems='center'
				justifyContent='center'>
				<Image src={'/hero.png'} alt='hero_image' width={720} height={458} />
				<Box position='absolute' left='-0.5rem' bottom='-6.5rem'>
					<Image
						src={'/hero_2.png'}
						alt='hero_2_image'
						width={200}
						height={345}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default Hero;
