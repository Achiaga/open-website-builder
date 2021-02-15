import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from '../../../hooks/translation';
import { List, ListItem, ListIcon } from '@chakra-ui/react';

import FooterCircle from '../../../assets/footer-circle';
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
			marginBottom='4rem'
			px={['1.5rem', 'auto']}
			flexDir='column'>
			<Box
				display={['none', 'block']}
				pos='absolute'
				left='-5rem'
				bottom='-25rem'>
				<FooterCircle />
			</Box>
			<Text
				position='relative'
				fontWeight='bold'
				textAlign='center'
				fontFamily='Montserrat'
				fontSize={['2.5rem', '50px']}
				lineHeight={['3rem', '4rem']}>
				{t.card_info.title}
				<br />
				<Text as='span' color='primary.500'>
					{t.card_info.title_color}
				</Text>
			</Text>
			<Text
				position='relative'
				fontSize='24px'
				marginTop='1rem'
				color='gray.600'>
				{t.card_info.subtitle}
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
					display='flex'
					justifyContent='start'
					alignItems='stretch'
					fontFamily='Montserrat'
					boxShadow='0px 12px 12px rgba(0, 0, 0, 0.12)'
					bg='transparent'
					borderRadius={'20px'}
					flexDir={['column', 'row']}>
					<Box
						borderRadius={['20px 20px 0px 0px ', '20px 0px 0px 20px']}
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
							{t.card_info.old_title}
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
							{t.card_info.old_body}
						</Text>
						<List paddingTop='2rem' spacing='2'>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<HandDown />
								</Box>
								{t.card_info.old_list[1]}
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<HandDown />
								</Box>
								{t.card_info.old_list[2]}
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<HandDown />
								</Box>
								{t.card_info.old_list[3]}
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<HandDown />
								</Box>
								{t.card_info.old_list[4]}
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<HandDown />
								</Box>
								{t.card_info.old_list[5]}
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<HandDown />
								</Box>
								{t.card_info.old_list[6]}
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<HandDown />
								</Box>
								{t.card_info.old_list[7]}
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<HandDown />
								</Box>
								{t.card_info.old_list[8]}
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
							{t.card_info.new_title}
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
							{t.card_info.new_body}
						</Text>
						<List paddingTop='3.5rem' spacing='2'>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<CheckList />
								</Box>
								{t.card_info.new_list[1]}
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<CheckList />
								</Box>
								{t.card_info.new_list[2]}
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<CheckList />
								</Box>
								{t.card_info.new_list[3]}
							</ListItem>
							{/* You can also use custom icons from react-icons */}
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<CheckList />
								</Box>
								{t.card_info.new_list[4]}
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<CheckList />
								</Box>
								{t.card_info.new_list[5]}
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<CheckList />
								</Box>
								{t.card_info.new_list[6]}
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<CheckList />
								</Box>
								{t.card_info.new_list[7]}
							</ListItem>
							<ListItem display='flex' alignItems='center'>
								<Box marginRight='0.5rem'>
									<CheckList />
								</Box>
								{t.card_info.new_list[8]}
							</ListItem>
						</List>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Steps;
