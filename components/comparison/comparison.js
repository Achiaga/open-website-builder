import Image from 'next/image';
import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from '../../hooks/translation';

import CheckIcon from '../../assets/check-icon';
import CloseIcon from '../../assets/close-icon';
import BackgroundCircles from './background';
import ImageSlider from './img-slider';

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
			w={['100vw', '100%']}
			pb={['1.5rem', '0']}
			mx={['auto', 0]}>
			<Box
				w={['90vw', '100%']}
				mx={['auto', 0]}
				mt={['2rem', '6rem']}
				mb={['2rem', '6rem']}>
				<BackgroundCircles />
				<Text
					as='h1'
					position='relative'
					fontWeight='bold'
					textAlign='center'
					color='black'
					fontFamily='Montserrat'
					fontSize={['2.5rem', '50px']}
					lineHeight={['3rem', '4rem']}
					w={['auto', '60rem']}
					pb={['0.75rem', '0']}
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
				<Box
					position='relative'
					display={['none', 'flex']}
					justifyContent='center'
					alignItems='center'
					w='100%'
					pt='5rem'
					px='2rem'>
					<Box
						display={['none', 'flex']}
						flexDirection='column'
						justifyContent='center'
						alignItems='center'
						w='100%'
						h='100%'
						mr='15px'>
						<Box display='flex' pb={8}>
							<CloseIcon />
							<Text
								as='p'
								pl='1.5rem'
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
						w='100%'
						h='100%'
						ml='15px'>
						<Box display={['none', 'flex']} pb={8}>
							<CheckIcon />
							<Text
								as='p'
								pl='1.5rem'
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
