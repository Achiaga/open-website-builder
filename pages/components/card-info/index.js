import { Box, Text } from '@chakra-ui/react'
import { useTranslation } from '../../../hooks/translation'
import { List, ListItem, ListIcon } from '@chakra-ui/react'

import CheckList from '../../../assets/check-list'
import HandDown from '../../../assets/hand-down'

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
			marginTop='6rem'
			marginBottom='4rem'
			px={['1.5rem', 'auto']}
			flexDir='column'>
			<Text
				position='relative'
				fontWeight='bold'
				textAlign='center'
				fontFamily='Montserrat'
				fontSize={['2.5rem', '50px']}
				lineHeight={['3rem', '4rem']}>
				Creating resumes used to be a pain
			</Text>
			<Text
				position='relative'
				fontSize='24px'
				marginTop='1rem'
				color='gray.600'>
				The way we work has changed, but resumes haven’t. Until now.
			</Text>
			<Box
				position='relative'
				display='flex'
				justifyContent='center'
				alignItems='center'
				width='100%'
				borderRadius='20px'
				paddingTop='3rem'>
				<Box
					w='1100px'
					display='flex'
					justifyContent='start'
					alignItems='stretch'
					fontFamily='Montserrat'
					boxShadow='0px 12px 12px rgba(0, 0, 0, 0.12)'
					bg='transparent'
					borderRadius={'20px'}
					flexDir={['column', 'row']}>
					<Box
						borderRadius={['20px 20px 0px 0px ', '0px 20px 20px 0px']}
						w={['100%', '50%']}
						bg='gray.200'
						px={['1rem', '3rem']}
						py='3rem'>
						<Text
							as='h1'
							fontFamily='Montserrat'
							fontSize='24px'
							fontStyle='normal'
							fontWeight='700'
							lineHeight='29px'
							letterSpacing='0em'
							textAlign='start'>
							The old way
						</Text>
						<Text
							as='h1'
							paddingTop='1rem'
							fontFamily='Montserrat'
							fontSize='18px'
							fontStyle='normal'
							fontWeight='400'
							lineHeight='26px'
							letterSpacing='0em'
							textAlign='start'>
							The old way is boring and time-consuming. You have to and design
							the resume in software like Word, then populate it and after that
							tedious task, you will need to export PDF to share it. The worst
							part being, you need to redo the whole process every time you
							update the resume 😢
						</Text>
						<List paddingTop='2rem' spacing='2'>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<HandDown />
								</Box>
								Word document.
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<HandDown />
								</Box>
								Only sharable via email.
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<HandDown />
								</Box>
								Difficulty to fit everything together.
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<HandDown />
								</Box>
								Time consuming to update.
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<HandDown />
								</Box>
								Similar to the rest of candidates resumes.
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<HandDown />
								</Box>
								Time consuming to update.
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<HandDown />
								</Box>
								Average first impression.
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<HandDown />
								</Box>
								Once you share it you can not update it.
							</ListItem>
						</List>
					</Box>

					<Box
						w={['100%', '50%']}
						bg='primary.100'
						px={['1rem', '3rem']}
						py={'3rem'}
						borderRadius={['0px 0px 20px 20px ', '0px 20px 20px 0px']}>
						<Text
							as='h1'
							fontFamily='Montserrat'
							color='primary.500'
							fontSize='24px'
							fontStyle='normal'
							fontWeight='700'
							lineHeight='29px'
							letterSpacing='0em'
							textAlign='start'>
							The new way
						</Text>
						<Text
							as='h1'
							paddingTop='1rem'
							fontFamily='Montserrat'
							fontSize='18px'
							fontStyle='normal'
							fontWeight='400'
							lineHeight='26px'
							letterSpacing='0em'
							textAlign='start'>
							The new way is more fun. Two steps. First, you select a template,
							then you populate it with the help of our pre-written ( by experts
							) sentence. That is it 🥳. Easy, simple, and fun. Once you are
							finished you will give your own domain where your new web-resume
							will be hosted.
						</Text>
						<List paddingTop='3.5rem' spacing='2'>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<CheckList />
								</Box>
								Online creation.
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<CheckList />
								</Box>
								Update your resume in seconds.
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<CheckList />
								</Box>
								Dozends of templates, just one click away.
							</ListItem>
							{/* You can also use custom icons from react-icons */}
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<CheckList />
								</Box>
								Add pre-written phrases.
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<CheckList />
								</Box>
								Export to anything.
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<CheckList />
								</Box>
								Share with everyone.
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<CheckList />
								</Box>
								Accesible by URL.
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<CheckList />
								</Box>
								Instantly accesible, just share the link.
							</ListItem>
						</List>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default Steps
