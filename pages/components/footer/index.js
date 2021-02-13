import { Box, Input, Button } from '@chakra-ui/react';
import { useTranslation } from '../../../hooks/translation';

import LogoSvg from '../../../assets/logo.js';
// import Button from '../../../Components/Button';
import Linkedin from '../../../assets/linkedin.js';
import Twitter from '../../../assets/twitter.js';

const Features = () => {
	const [t] = useTranslation();

	return (
		<Box
			position='relative'
			display='flex'
			justifyContent='center'
			alignItems='center'
			width='100%'
			height='220px'
			marginTop='10rem'>
			<Box pos='absolute' left='4rem'>
				<LogoSvg />
			</Box>
			<Box
				w='537px'
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
				<Input
					bg='primary.100'
					color='gray.500'
					border='none'
					borderRadius='5px'
					w='315px'
					placeholder='Type your email'
					type='email'
					id='email'
				/>
				<Button
					w='212px'
					fontSize='18px'
					fontWeight='bold'
					color='white'
					bg='primary.500'
					borderRadius='5px'
					minWidth='7.5rem'
					height='2.5rem'
					_hover={{ bg: 'primary.500' }}
					_active={{
						bg: 'primary.500',
						transform: 'scale(0.98)',
						borderColor: '#bec3c9',
					}}
					_focus={{
						boxShadow:
							'0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
					}}>
					Sign Up
				</Button>
			</Box>
			<Box
				pos='absolute'
				w='65px'
				right='4rem'
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
				<Button>
					<Linkedin />
				</Button>
				<Button>
					<Twitter />
				</Button>
			</Box>
		</Box>
	);
};

export default Features;
