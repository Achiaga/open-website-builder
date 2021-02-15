import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from '../../../hooks/translation';

const Steps = () => {
	const [t] = useTranslation();

	return (
		<Box
			position='relative'
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
			width='100%'
			marginTop='3rem'
			marginBottom={['2rem', '6.5rem']}
			px={['0', '6rem']}>
			<Text
				position='relative'
				fontWeight='bold'
				color='primary.500'
				textAlign='center'
				fontFamily='Montserrat'
				fontSize={['2.5rem', '50px']}
				lineHeight={['3rem', '4rem']}
				paddingX={['0.75rem', '0']}
				width={['auto', '50rem']}>
				{t.steps.title}
			</Text>
			<Box
				position='relative'
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				width='100%'
				paddingTop={['2rem', '5rem']}
				paddingX={['1rem', '2rem']}
				flexDir={['column', 'row']}>
				<Box
					w='300px'
					h={['380px', '440px']}
					display='flex'
					flexDirection='column'
					justifyContent='start'
					alignItems='center'
					fontFamily='Montserrat'
					boxShadow='0px 12px 12px 12px rgba(0, 0, 0, 0.12)'
					bg='white'
					borderRadius='20px'
					padding='1.5rem'
					mb={['4rem', 0]}>
					<Text as='h1' fontSize={['20px', '36px']} fontWeight='400'>
						{t.steps.step_1}
					</Text>
					<Text
						as='h3'
						fontSize={'24px'}
						color='primary.500'
						fontWeight='700'
						paddingBottom='1rem'>
						{t.steps.step_1_title}
					</Text>
					<Text as='p' fontSize={['16px', '18px']} fontWeight='400'>
						{t.steps.step_1_body}
					</Text>
				</Box>
				<Box
					w='300px'
					h={['380px', '440px']}
					display='flex'
					flexDirection='column'
					justifyContent='start'
					alignItems='center'
					fontFamily='Montserrat'
					boxShadow='0px 12px 12px 12px rgba(0, 0, 0, 0.12)'
					bg='white'
					borderRadius='20px'
					padding='1.5rem'
					mb={['4rem', 0]}>
					<Text as='h1' fontSize={['20px', '36px']} fontWeight='400'>
						{t.steps.step_2}
					</Text>
					<Text
						as='h3'
						fontSize={'24px'}
						color='primary.500'
						fontWeight='700'
						paddingBottom='1rem'>
						{t.steps.step_2_title}
					</Text>
					<Text as='p' fontSize={['16px', '18px']} fontWeight='400'>
						{t.steps.step_2_body}
					</Text>
					<Text
						as='p'
						fontSize='14px'
						color='gray.600'
						fontWeight='400'
						paddingTop='1.5rem'
						paddingBottom='2rem'>
						{t.steps.step_2_body}
					</Text>
				</Box>
				<Box
					w='300px'
					h={['380px', '440px']}
					display='flex'
					flexDirection='column'
					justifyContent='start'
					alignItems='center'
					fontFamily='Montserrat'
					boxShadow='0px 12px 12px 12px rgba(0, 0, 0, 0.12)'
					bg='white'
					borderRadius='20px'
					padding='1.5rem'>
					<Text as='h1' fontSize={['20px', '36px']} fontWeight='400'>
						{t.steps.step_3}
					</Text>
					<Text
						as='h3'
						fontSize={'24px'}
						color='primary.500'
						fontWeight='700'
						paddingBottom='1rem'>
						{t.steps.step_3_title}
					</Text>
					<Text as='p' fontSize={['16px', '18px']} fontWeight='400'>
						{t.steps.step_3_body}
					</Text>
				</Box>
			</Box>
		</Box>
	);
};

export default Steps;
