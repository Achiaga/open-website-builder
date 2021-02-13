import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from '../../../hooks/translation';

import Button from '../../../Components/Button';
import CircleBg from '../../../assets/features-circle.tsx';

const Features = () => {
	const [t] = useTranslation();
	const [textIndex, setTextIndex] = useState(0);
	const [stopInterval, setStopInterval] = useState(false);

	useEffect(() => {
		if (!stopInterval) {
			const intervalIndex = setInterval(() => {
				setTextIndex((state) => {
					if (state < 3) setTextIndex(state + 1);
					else setTextIndex(0);
				});
			}, 3000);
			return () => clearInterval(intervalIndex);
		}
	}, [textIndex]);

	const selectedImg = {
		0: '/features_simple.png',
		1: '/features_template.png',
		2: '/features_wow.png',
		3: '/features_template.png',
	}[textIndex];

	const handleTextIndex = (e) => {
		const { id } = e.currentTarget;
		setStopInterval(true);
		console.log(Number(id));
		setTextIndex(Number(id));
	};

	return (
		<Box
			position='relative'
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
			width='100%'
			marginTop='4rem'
			marginBottom='6.5rem'>
			<Box position='absolute' right='0' bottom='-30rem' zIndex='0'>
				<CircleBg />
			</Box>
			<Text
				position='relative'
				fontWeight='bold'
				width='1053px'
				textAlign='center'
				color='black'
				fontFamily='Montserrat'
				fontSize='50px'
				lineHeight='60px'
				width='50rem'
				lineHeight='4rem'>
				{t.features.title_1}
				<Text as='span' color='primary.500'>
					{t.features.title_color_2}
				</Text>
				{t.features.title_3}
				<Text as='span' color='primary.500'>
					{t.features.title_color_4}
				</Text>
				{t.features.title_5}
			</Text>
			<Text fontSize='24px' marginTop='1rem' color='gray.600'>
				{t.features.subtitle}
			</Text>
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				width='100%'
				paddingTop='2rem'
				paddingX='2rem'>
				<Box
					display='flex'
					justifyContent='center'
					alignItems='center'
					width='70%'>
					<Image
						src={selectedImg}
						alt='features_simple_image'
						width={700}
						height={446}
					/>
				</Box>
				<Box
					position='relative'
					display='flex'
					justifyContent='start'
					flexDirection='column'
					alignItems='baseline'
					height='100%'
					paddingBottom='3rem'
					width='30%'>
					<Text
						onClick={handleTextIndex}
						id='0'
						cursor='pointer'
						color={textIndex === 0 ? `primary.500` : `primary.300`}
						fontFamily='Montserrat'
						fontSize='25px'
						fontStyle='normal'
						fontWeight='700'
						lineHeight='30px'
						letterSpacing='0em'
						textAlign='left'>
						{t.features.feature_1}
					</Text>
					{textIndex === 0 && (
						<Text
							as='span'
							width='350px'
							color='gray.600'
							fontFamily='Montserrat'
							fontSize='22px'
							fontStyle='normal'
							fontWeight='500'
							lineHeight='28px'
							letterSpacing='0em'
							textAlign='left'>
							{t.features.feature_text_1}
						</Text>
					)}
					<Text
						color={textIndex === 1 ? `primary.500` : `primary.300`}
						fontFamily='Montserrat'
						onClick={handleTextIndex}
						id='1'
						cursor='pointer'
						fontSize='25px'
						fontStyle='normal'
						paddingTop='1rem'
						fontWeight='700'
						lineHeight='30px'
						letterSpacing='0em'
						textAlign='left'>
						{t.features.feature_2}
					</Text>
					{textIndex === 1 && (
						<Text
							as='span'
							width='350px'
							color='gray.600'
							fontFamily='Montserrat'
							fontSize='22px'
							fontStyle='normal'
							fontWeight='500'
							lineHeight='28px'
							letterSpacing='0em'
							textAlign='left'>
							{t.features.feature_text_2}
						</Text>
					)}
					<Text
						color={textIndex === 2 ? `primary.500` : `primary.300`}
						fontFamily='Montserrat'
						onClick={handleTextIndex}
						id='2'
						cursor='pointer'
						fontSize='25px'
						fontStyle='normal'
						paddingTop='1rem'
						fontWeight='700'
						lineHeight='30px'
						letterSpacing='0em'
						textAlign='left'>
						{t.features.feature_3}
					</Text>
					{textIndex === 2 && (
						<Text
							as='span'
							width='350px'
							color='gray.600'
							fontFamily='Montserrat'
							fontSize='22px'
							fontStyle='normal'
							fontWeight='500'
							lineHeight='28px'
							letterSpacing='0em'
							textAlign='left'>
							{t.features.feature_text_3}
						</Text>
					)}
					<Text
						color={textIndex === 3 ? `primary.500` : `primary.300`}
						fontFamily='Montserrat'
						onClick={handleTextIndex}
						id='3'
						cursor='pointer'
						fontSize='25px'
						paddingTop='1rem'
						fontStyle='normal'
						fontWeight='700'
						lineHeight='30px'
						letterSpacing='0em'
						textAlign='left'>
						{t.features.feature_4}
					</Text>
					{textIndex === 3 && (
						<Text
							as='span'
							width='350px'
							color='gray.600'
							fontFamily='Montserrat'
							fontSize='22px'
							fontStyle='normal'
							fontWeight='500'
							lineHeight='28px'
							letterSpacing='0em'
							textAlign='left'>
							{t.features.feature_text_4}
						</Text>
					)}
					<Button padding='1.5rem' marginTop='2rem'>
						{t.features.button}
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Features;
