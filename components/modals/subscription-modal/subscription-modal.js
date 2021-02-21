import { useEffect, useState } from 'react';
import { Box, Text, Input, Progress, Spinner } from '@chakra-ui/react';
import { ModalContent, ModalCloseButton } from '@chakra-ui/react';

import Modal from '../../modal';
import Button from '../../commun/button';

import { AnalyticsEvent } from '../../../utils/analytics';
import { useTranslation } from '../../../hooks/translation';
import { addUserToBetaList, getAllUsers } from '../../../helpers/transport';

const SubscriptionModal = ({ isModalOpen, toggleModalOpen }) => {
	const [t] = useTranslation();
	const [emailValue, setEmailValue] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [users, setUSers] = useState(null);

	const handleSubmitEmail = (e) => {
		e.preventDefault();
		if (isLoading || !emailValue) return;
		setIsLoading(true);
		AnalyticsEvent('signup', 'modal');
		addUserToBetaList(emailValue)
			.then((value) => {
				if (value === 'success') {
					setIsSuccess(true);
					setEmailValue('');
				}
			})
			.finally(() => setIsLoading(false));
	};

	const handleEmail = (e) => {
		const { value } = e.target;
		setEmailValue(value);
		setIsSuccess(false);
	};

	useEffect(() => {
		getAllUsers().then(({ records }) => setUSers(records + 10));
	}, [isSuccess]);

	return (
		<Modal isOpen={isModalOpen} onClose={toggleModalOpen}>
			<ModalContent
				bg='white'
				maxW='50rem'
				m='auto'
				borderRadius={['0px', '12px']}
				display='flex'
				flexDir={['column', 'row']}
				justifyContent='center'
				alignItems='stretch'>
				<Box
					borderRadius={['0px', '12px']}
					w={['100%', '60%']}
					p={4}
					px={8}
					fontSize='md'
					fontWeight='normal'
					fontFamily='Montserrat'
					display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems='center'>
					<ModalCloseButton />
					<Text
						as='h1'
						color='primary.500'
						pt={2}
						fontSize='md'
						fontWeight='medium'
						textAlign='center'>
						{t.subscription_modal.header}
					</Text>
					<Text as='p' lineHeight='20px' pt={4}>
						{t.subscription_modal.body_1}
						<br />
						<br />
						{t.subscription_modal.body_2}
						<br />
						<br />
						{t.subscription_modal.body_3}
						<Text as='span' color='primary.500'>
							{t.subscription_modal.body_color_1}
						</Text>
						{t.subscription_modal.body_4}
					</Text>
					<Box w='100%' pt={8} pb={4}>
						<Progress
							borderRadius='10px'
							bg='primary.100'
							colorScheme='green'
							value={users}
						/>
						<Text fontWeight='500' as='p' paddingTop='1rem' textAlign='center'>
							<Text fontWeight='600' as='span' color='green.400' mr='5px'>
								{users}
							</Text>
							{t.subscription_modal.progressLabel}
						</Text>
					</Box>
					<Text fontWeight='medium' as='p' fontSize='sm' textAlign='center'>
						<Text as='span' color='primary.500'>
							{t.subscription_modal.footer_color_1}
						</Text>
						{t.subscription_modal.footer}
						<Text as='span' color='primary.500'>
							{t.subscription_modal.footer_color_2}
						</Text>
					</Text>
				</Box>
				<Box
					width={['100%', '40%']}
					borderRadius={['0px', '0 12px 12px 0']}
					p={4}
					bg='primary.100'
					fontSize='lg'
					fontWeight='semibold'
					fontFamily='Montserrat'
					display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems='center'>
					<Text
						as='h1'
						textAlign='center'
						lineHeight='24px'
						d={['none', 'block']}>
						{t.subscription_modal.join}
						<br />
						<Text as='span' color='primary.500'>
							{t.subscription_modal.join_color}
						</Text>
					</Text>
					<Box
						as='form'
						display='flex'
						flexDirection='column'
						justifyContent='center'
						w='100%'
						onSubmit={handleSubmitEmail}>
						<Input
							my={6}
							mt={[2, 8]}
							border='none'
							bg='gray.100'
							placeholder={t.subscription_modal.email_subscription}
							type='email'
							id='email'
							value={emailValue}
							onChange={handleEmail}
						/>
						<Button
							type='submit'
							h={10}
							minW='7.5rem'
							fontSize='md'
							fontWeight='semibold'
							bg={isSuccess ? 'green.500' : 'primary.500'}
							_hover={{ bg: `${isSuccess ? 'green.500' : 'primary.500'}` }}
							_active={{
								bg: `${isSuccess ? 'green.500' : 'primary.500'}`,
								transform: 'scale(0.98)',
								borderColor: '#bec3c9',
							}}>
							{isLoading ? (
								<Spinner />
							) : isSuccess ? (
								t.button_success
							) : (
								t.subscription_modal.access
							)}
						</Button>
					</Box>
				</Box>
			</ModalContent>
		</Modal>
	);
};

export default SubscriptionModal;
