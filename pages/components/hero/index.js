import Image from 'next/image'
import { Box, Text, useMediaQuery } from '@chakra-ui/react'

import { useTranslation } from '../../../hooks/translation'
import Button from '../../../Components/Button'

const Hero = ({ handleFreeTrial }) => {
	const [t] = useTranslation()
	const [isSmallerThan900] = useMediaQuery('(max-width: 900px)')

	const handleButton = (e) => {
		AnalyticsEvent('modal_open', 'hero')
		handleFreeTrial(e)
	}

	return (
		<Box
			position='relative'
			display='flex'
			flexDir={['column', 'row']}
			justifyContent='space-between'
			alignItems='center'
			width={['90vw', '100%']}
			marginTop={[0, '1.25rem']}
			marginBottom={['2rem', '6.5rem']}
			pl={['0.5rem', '6rem']}>
			<Box
				display='flex'
				flexDirection='column'
				alignItems='baseline'
				justifyContent='center'
				marginleft={[0, '6.5rem']}
				width={['100%', '30%']}
				marginTop='2rem'>
				<Text
					as='h1'
					fontWeight='bold'
					color='black'
					fontFamily='Montserrat'
					fontSize={['2.5rem', '40px']}
					lineHeight={['3rem', '120%']}
					paddingBottom={['1rem', '0']}>
					{t.hero.title_1}
					<Text as='span' color='primary.500'>
						{t.hero.title_color_2}
						<br />
					</Text>
					{t.hero.title_3}
				</Text>
				{isSmallerThan900 && (
					<Image
						marginleft={'-10rem'}
						src={'/hero.png'}
						alt='hero_image'
						width={720}
						height={458}
					/>
				)}
				<Text
					color='gray.600'
					marginTop='1.25rem'
					fontFamily='Montserrat'
					fontSize='24px'
					as='h2'>
					{t.hero.subtitle}
				</Text>
				<Button onClick={handleButton} marginTop='1.5rem'>
					{t.hero.button}
				</Button>
			</Box>
			<Box
				position='relative'
				width='60%'
				display='flex'
				alignItems='center'
				justifyContent='center'>
				{!isSmallerThan900 && (
					<Image
						src={'/hero.png'}
						alt='hero_image'
						width={720}
						height={458}
						loading='eager'
					/>
				)}
				{!isSmallerThan900 && (
					<Box position='absolute' left='-0.5rem' bottom='-6.5rem'>
						<Image
							src={'/hero_2.png'}
							alt='hero_2_image'
							width={200}
							height={345}
						/>
					</Box>
				)}
			</Box>
		</Box>
	)
}

export default Hero
