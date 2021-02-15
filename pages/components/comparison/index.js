import Image from 'next/image';
import {
	Box,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Text,
} from '@chakra-ui/react';
import { useTranslation } from '../../../hooks/translation';

import CheckIcon from '../../../assets/check-icon';
import CloseIcon from '../../../assets/close-icon';
import UnsexyBg from '../../../assets/unsexy-circle';
import SexyBg from '../../../assets/sexy-circle';
import { useEffect, useState } from 'react';
import SlideIcon from '../../../assets/slide-icon';

const INITIAL_SLIDE_VALUE = 50;

const TextSlider = () => {
	const [t] = useTranslation();
	return (
		<Box d={['none', 'flex']} mt='3rem' alignItems='center'>
			<CheckIcon />
			<Text fontSize='26px' textAlign='center' fontWeight='700'>
				{t.comparison.sexy_1_mobile}
				<Text as='span' color='green.400'>
					{t.comparison.sexy_color_2}
				</Text>
				{t.comparison.sexy_3_mobile}
			</Text>
		</Box>
	);
};

const ImageSlider = () => {
	const [sliderValue, setSliderValue] = useState(INITIAL_SLIDE_VALUE);
	const [showHelper, setShowHelper] = useState(true);

	useEffect(() => {
		showHelper && sliderValue !== INITIAL_SLIDE_VALUE && setShowHelper(false);
	}, [sliderValue, showHelper]);

	return (
		<Box
			d={['flex', 'none']}
			flexDir='column'
			justifyContent='center'
			alignItems='center'
			pos='relative'
			width='90vw'
			m='auto'
			height='500px'>
			<Box
				style={{ clipPath: `inset(0 0 0 ${sliderValue}%)` }}
				pos='absolute'
				left='0'
				top='16px'>
				<Image src={'/sexy.png'} alt='sexy' width={520} height={735} />
			</Box>
			<Box
				style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
				pos='absolute'
				right='0'
				top='16px'>
				<Image
					src={'/unsexy.png'}
					alt='unsexy_image'
					width={520}
					height={735}
				/>
			</Box>
			<Slider
				pos='absolute'
				top='10%'
				colorScheme='primary'
				width='90vw'
				aria-label='slider-ex-4'
				value={sliderValue}
				onChange={setSliderValue}>
				<SliderTrack bg='transparent'>
					<SliderFilledTrack bg='transparent' />
				</SliderTrack>
				<SliderThumb boxSize={6} color='primary.500' bg='primary.500'>
					<Box color='primary.500' bg='primary.500' />
				</SliderThumb>
				{showHelper && (
					<Box position='absolute' top='22px' left='43%'>
						<SlideIcon fill='#506BF0' zindex='2' />
					</Box>
				)}
			</Slider>
		</Box>
	);
};

const Comparison = () => {
	const [t] = useTranslation();

	return (
		<Box
			bg={['primary.100', 'transparent']}
			position='relative'
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
			width={['100vw', '100%']}
			paddingBottom={['1.5rem', '0']}
			mx={['auto', 0]}>
			<Box
				width={['90vw', '100%']}
				mx={['auto', 0]}
				marginTop={['2rem', '6rem']}
				marginBottom={['2rem', '6rem']}>
				<Box
					display={['none', 'block']}
					position='absolute'
					left='0'
					top='1rem'
					d={['none', 'block']}>
					<UnsexyBg />
				</Box>
				<Box
					display={['none', 'block']}
					position='absolute'
					right='0'
					top='12rem'>
					<SexyBg />
				</Box>
				<Text
					as='h1'
					position='relative'
					fontWeight='bold'
					textAlign='center'
					color='black'
					fontFamily='Montserrat'
					fontSize={['2.5rem', '50px']}
					lineHeight={['3rem', '4rem']}
					width={['auto', '70rem']}
					paddingBottom={['0.75rem', '0']}
					mx='auto'>
					{t.comparison.title_1}
					<Text as='span' color='primary.500'>
						{t.comparison.title_color_2}
					</Text>
					{t.comparison.title_3}
					<Text as='span' color='primary.500'>
						{t.comparison.title_color_4}
					</Text>
				</Text>
				<Text
					as='h2'
					textAlign='center'
					position='relative'
					fontSize={['22px', '24px']}
					my={['2rem', '1rem']}
					width={['auto', '60rem']}
					m={['auto']}
					color='gray.600'>
					{t.comparison.subtitle}
				</Text>
				<ImageSlider />
				<TextSlider />
				<Box
					position='relative'
					display={['none', 'flex']}
					justifyContent='center'
					alignItems='center'
					width='100%'
					paddingTop='5rem'
					paddingX='2rem'>
					<Box
						display={['none', 'flex']}
						flexDirection='column'
						justifyContent='center'
						alignItems='center'
						width='100%'
						height='100%'
						mr='15px'>
						<Box display='flex' paddingBottom='2rem'>
							<CloseIcon />
							<Text
								as='span'
								paddingLeft='1.5rem'
								fontSize='36px'
								lineHeight='43.2px'
								textAlign='center'
								fontWeight='700'>
								{t.comparison.un_sexy_1}
								<Text as='span' color='red.400'>
									{t.comparison.un_sexy_color_2}
								</Text>
								{t.comparison.un_sexy_3}
							</Text>
						</Box>
						<Image
							style={{ clipPath: 'inset(0 0 0 50%)' }}
							src={'/unsexy.png'}
							alt='unsexy_image'
							width={520}
							height={735}
						/>
					</Box>
					<Box
						display={['none', 'flex']}
						flexDirection='column'
						justifyContent='center'
						alignItems='center'
						width='100%'
						height='100%'
						ml='15px'>
						<Box display={['none', 'flex']} paddingBottom='2rem'>
							<CheckIcon />
							<Text
								paddingLeft='1.5rem'
								fontSize='36px'
								lineHeight='43.2px'
								textAlign='center'
								fontWeight='700'>
								{t.comparison.sexy_1}
								<Text as='span' color='green.400'>
									{t.comparison.sexy_color_2}
								</Text>
								{t.comparison.sexy_3}
							</Text>
						</Box>
						<Image src={'/sexy.png'} alt='sexy' width={520} height={735} />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Comparison;
