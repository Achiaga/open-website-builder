import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from '../../hooks/translation';

import BackgroundCircle from './background';
import OldCard from './old-card';
import NewCard from './new-card';

const Steps = () => {
	const [t] = useTranslation();

	return (
		<Box
			position='relative'
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
			w='100%'
			mt='6rem'
			mb='4rem'
			px={['1.5rem', 'auto']}
			flexDirection='column'>
			<BackgroundCircle />
			<Text
				as='h1'
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
			<Text position='relative' fontSize='24px' mt='1rem' color='gray.600'>
				{t.card_info.subtitle}
			</Text>
			<Box
				position='relative'
				display='flex'
				justifyContent='center'
				alignItems='center'
				w='100%'
				pt={12}>
				<Box
					w='1100px'
					display='flex'
					justifyContent='start'
					alignItems='stretch'
					fontFamily='Montserrat'
					boxShadow='0px 12px 12px rgba(0, 0, 0, 0.12)'
					bg='transparent'
					borderRadius={'20px'}
					flexDirection={['column', 'row']}>
					<OldCard
						title={t.card_info.old_title}
						body={t.card_info.old_body}
						listCard={t.card_info.old_list}
					/>
					<NewCard
						title={t.card_info.new_title}
						body={t.card_info.new_body}
						listCard={t.card_info.new_list}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default Steps;
