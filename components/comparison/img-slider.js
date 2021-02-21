import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
	Box,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
} from '@chakra-ui/react';

import SlideIcon from '../../assets/slide-icon';

const INITIAL_SLIDE_VALUE = 50;

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

export default ImageSlider;
