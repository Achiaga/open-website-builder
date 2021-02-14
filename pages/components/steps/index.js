import { Box, Text } from '@chakra-ui/react'
import { useTranslation } from '../../../hooks/translation'

const Steps = () => {
	const [t] = useTranslation()

	return (
		<Box
			position='relative'
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
			width='100%'
			marginTop='3rem'
			marginBottom={['2rem', '6.5rem']}>
			<Text
				position='relative'
				fontWeight='bold'
				color='primary.500'
				width='1053px'
				textAlign='center'
				fontFamily='Montserrat'
				fontSize={['2.5rem', '50px']}
				lineHeight={['3rem', '4rem']}
				width={['auto', '50rem']}>
				How does it works?
			</Text>
			<Box
				position='relative'
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				width='80%'
				paddingTop='5rem'
				paddingX='2rem'
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
						Step 1
					</Text>
					<Text
						as='h3'
						fontSize={'24px'}
						color='primary.500'
						fontWeight='700'
						paddingBottom='1rem'>
						Choose template
					</Text>
					<Text as='p' fontSize={['16px', '18px']} fontWeight='400'>
						We have dozens of templates with predefined senteces to make your
						live easier. Just choose one you like and you are ready to go.
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
						Step 2
					</Text>
					<Text
						as='h3'
						fontSize={'24px'}
						color='primary.500'
						fontWeight='700'
						paddingBottom='1rem'>
						Populate
					</Text>
					<Text as='p' fontSize={['16px', '18px']} fontWeight='400'>
						Add your skills and experince to the resume, we will guide you
						through out the process so dont worry, it will be fun.
					</Text>
					<Text
						as='p'
						fontSize='14px'
						color='gray.600'
						fontWeight='400'
						paddingTop='1.5rem'
						paddingBottom='2rem'>
						You don't like this part, we don't either. That is why we have
						invested a lot of time to make it easy and fun. You will never want
						to go back to the old way of populating resumes.
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
						Step 3
					</Text>
					<Text
						as='h3'
						fontSize={'24px'}
						color='primary.500'
						fontWeight='700'
						paddingBottom='1rem'>
						Publish
					</Text>
					<Text as='p' fontSize={['16px', '18px']} fontWeight='400'>
						Congrats, you have finished your web-resume. now you have your own
						part of the internet. You can share the url and anyone you want will
						be able to see your awesome resume.
					</Text>
				</Box>
			</Box>
		</Box>
	)
}

export default Steps
