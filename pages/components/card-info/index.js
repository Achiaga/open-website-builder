import Image from 'next/image';
import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from '../../../hooks/translation';
import { List, ListItem, ListIcon } from '@chakra-ui/react';

import CheckList from '../../../assets/check-list';
import HandDown from '../../../assets/hand-down';

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
			marginTop='6rem'
			marginBottom='4rem'>
			<Text
				position='relative'
				fontWeight='bold'
				textAlign='center'
				fontFamily='Montserrat'
				fontSize='50px'
				lineHeight='60px'
				lineHeight='4rem'>
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
				paddingTop='3rem'>
				<Box
					w='1100px'
					h='640px'
					display='flex'
					justifyContent='start'
					alignItems='stretch'
					fontFamily='Montserrat'
					boxShadow='0px 12px 12px rgba(0, 0, 0, 0.12)'
					bg='white'
					borderRadius='20px'>
					<Box w='50%' bg='gray.200' padding='3rem'>
						<Text
							as='h1'
							fontDamily='Montserrat'
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
							fontDamily='Montserrat'
							fontsize='18px'
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
								<ListIcon as={HandDown} color='black' paddingRight='0.5rem' />
								Word document.
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<ListIcon as={HandDown} color='black' paddingRight='0.5rem' />
								Only sharable via email.
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<ListIcon as={HandDown} color='black' paddingRight='0.5rem' />
								Difficulty to fit everything together.
							</ListItem>
							{/* You can also use custom icons from react-icons */}
							<ListItem display='flex' alignItems='center'>
								<ListIcon as={HandDown} color='black' paddingRight='0.5rem' />
								Time consuming to update.
							</ListItem>
						</List>
					</Box>

					<Box w='50%' bg='primary.100' padding='3rem'>
						<Text
							as='h1'
							fontDamily='Montserrat'
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
							fontDamily='Montserrat'
							fontsize='18px'
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
								<ListIcon as={HandDown} color='black' paddingRight='0.5rem' />
								Word document.
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<ListIcon as={HandDown} color='black' paddingRight='0.5rem' />
								Only sharable via email.
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<ListIcon as={HandDown} color='black' paddingRight='0.5rem' />
								Difficulty to fit everything together.
							</ListItem>
							{/* You can also use custom icons from react-icons */}
							<ListItem display='flex' alignItems='center'>
								<ListIcon as={HandDown} color='black' paddingRight='0.5rem' />
								Time consuming to update.
							</ListItem>
						</List>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Steps;
