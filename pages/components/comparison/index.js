import Image from 'next/image';
import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from '../../../hooks/translation';

import CheckIcon from '../../../assets/check-icon.tsx';
import CloseIcon from '../../../assets/close-icon.tsx';
import UnsexyBg from '../../../assets/unsexy-circle.tsx';
import SexyBg from '../../../assets/sexy-circle.tsx';

const Comparison = () => {
	const [t] = useTranslation();

	return (
		<Box
			position='relative'
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
			width='100%'
			marginTop='6rem'
			marginBottom='6.5rem'>
			<Box position='absolute' left='0' top='1rem' zIndex='0'>
				<UnsexyBg />
			</Box>
			<Box position='absolute' right='0' top='12rem' zIndex='0'>
				<SexyBg />
			</Box>
			<Text
				fontWeight='bold'
				width='1053px'
				textAlign='center'
				color='black'
				fontFamily='Montserrat'
				fontSize='50px'
				lineHeight='60px'
				width='50rem'
				lineHeight='4rem'>
				{t.comparison.title_1}
				<Text as='span' color='primary.500'>
					{t.comparison.title_color_2}
				</Text>
				{t.comparison.title_3}
				<Text as='span' color='primary.500'>
					{t.comparison.title_color_4}
				</Text>
			</Text>
			<Text fontSize='24px' marginTop='1rem' color='gray.600'>
				{t.comparison.subtitle}
			</Text>
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				width='100%'
				paddingTop='5rem'
				paddingX='2rem'>
				<Box
					display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems='center'
					width='100%'
					height='100%'>
					<Box display='flex' paddingBottom='2rem' pos='relative'>
						<CloseIcon />
						<Text
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
						src={'/unsexy.png'}
						alt='unsexy_image'
						width={520}
						height={735}
					/>
				</Box>
				<Box
					display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems='center'
					width='100%'
					height='100%'>
					<Box display='flex' paddingBottom='2rem' pos='relative'>
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
	);
};

export default Comparison;
