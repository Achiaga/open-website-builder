import { Box, Text, Input, Button } from '@chakra-ui/react';
import Modal from '../../modal';

const SubscriptionModal = ({ toggleModalOpen }) => {
	return (
		<Modal toggleModalOpen={toggleModalOpen}>
			<Box
				bg='white'
				borderRadius='12px'
				width='706px'
				height='400px'
				display='flex'
				justifyContent='center'
				alignItems='center'
				zIndex='2'
				onClick={(e) => e.stopPropagation()}>
				<Box
					width='60%'
					borderRadius='12px'
					display='flex'
					padding='1rem'
					flexDirection='column'
					justifyContent='center'
					alignItems='center'>
					<Text>
						Join our ealy adopters' List, and get the job of your dreams
					</Text>
					<Text>
						We are thrilled to see you here 😁! Unfortunately, the app is not
						open to the public yet, it works by invitation only. If you want to
						join us, ask for early access. We want people to enjoy making their
						resume as they have never done before. If you want to help us in
						this adventure and change how people present themself! Let us know,
						we have 50 Free Pro accounts for our beta testers.
					</Text>
					<Text>slider</Text>
					<Text>
						Standout Resume is so fast and delightful — you'll feel like you
						have superpowers.
					</Text>
					<Input placeholder='type your email' />
				</Box>
				<Box
					width='40%'
					borderRadius='0 12px 12px 0'
					height='100%'
					padding='1rem'
					bg='primary.100'
					fontSize='18px'
					fontWeight='semibold'
					fontFamily='Montserrat'
					display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems='center'>
					<Text textAlign='center' lineHeight='24px'>
						Join
						<br />
						<Text as='span' color='primary.500'>
							Standout Resume
						</Text>
					</Text>
					<Input placeholder='type your email' />
					<Button>Get early access</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default SubscriptionModal;
