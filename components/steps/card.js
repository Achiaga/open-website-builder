import { Box, Text } from '@chakra-ui/react';

const Card = ({ step, title, body, subbody }) => {
	return (
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
				{step}
			</Text>
			<Text
				as='h3'
				fontSize={'24px'}
				color='primary.500'
				fontWeight='700'
				paddingBottom='1rem'>
				{title}
			</Text>
			<Text as='p' fontSize={['16px', '18px']} fontWeight='400'>
				{body}
			</Text>
			{subbody && (
				<Text
					as='p'
					fontSize='14px'
					color='gray.600'
					fontWeight='400'
					paddingTop='1.5rem'
					paddingBottom='2rem'>
					{subbody}
				</Text>
			)}
		</Box>
	);
};

export default Card;
