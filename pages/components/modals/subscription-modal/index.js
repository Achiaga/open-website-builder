import { useState } from 'react'
import { Box, Text, Input, Button, Progress, Spinner } from '@chakra-ui/react'
import { useTranslation } from '../../../../hooks/translation'
import { addUserToBetaList } from '../../../../helpers/transport'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton
} from '@chakra-ui/react'
import { AnalyticsEvent } from '../../../../utils/analytics'

const SubscriptionModal = ({ isModalOpen, toggleModalOpen }) => {
	const [t] = useTranslation()
	const [emailValue, setEmailValue] = useState('')
	const [isSuccess, setIsSuccess] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmitEmail = (e) => {
		e.preventDefault()
		if (isLoading || !emailValue) return
		setIsLoading(true)
		AnalyticsEvent('signup', 'modal')
		addUserToBetaList(emailValue)
			.then((value) => {
				if (value === 'success') {
					setIsSuccess(true)
					setEmailValue('')
				}
			})
			.finally(() => setIsLoading(false))
	}

	const handleEmail = (e) => {
		const { value } = e.target
		setEmailValue(value)
	}

	return (
		<Modal isOpen={isModalOpen} onClose={() => toggleModalOpen(false)}>
			<ModalOverlay />
			<ModalContent
				bg='white'
				maxWidth='50rem'
				margin='auto'
				borderRadius={['0px', '12px']}
				display='flex'
				flexDirection={['column', 'row']}
				justifyContent='center'
				alignItems='stretch'>
				<Box
					width={['100%', '60%']}
					borderRadius={['0px', '12px']}
					display='flex'
					padding='1rem'
					paddingX='2rem'
					flexDirection='column'
					justifyContent='center'
					fontSize='16px'
					fontFamily='Montserrat'
					fontWeight='400'
					alignItems='center'>
					<ModalCloseButton />
					<Text
						color='primary.500'
						paddingTop='0.5rem'
						fontSize='16px'
						fontWeight='500'
						textAlign='center'>
						{t.subscription_modal.header}
					</Text>
					<Text lineHeight='20px' paddingTop='1rem'>
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
					<Box w='100%' paddingTop='2rem' paddingBottom='1rem'>
						<Progress
							borderRadius='10px'
							bg='primary.100'
							// color='primary'
							colorScheme='green'
							value={40}
						/>
						<Text fontWeight='500' as='p' paddingTop='1rem' textAlign='center'>
							<Text fontWeight='600' as='span' color='green.400'>
								{t.subscription_modal.progressLabel_color}
							</Text>
							{t.subscription_modal.progressLabel}
						</Text>
					</Box>
					<Text fontWeight='500' as='p' fontSize='14px' textAlign='center'>
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
					padding={'1rem'}
					bg='primary.100'
					fontSize='18px'
					fontWeight='semibold'
					fontFamily='Montserrat'
					display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems='center'>
					<Text textAlign='center' lineHeight='24px' d={['none', 'block']}>
						{t.subscription_modal.join}
						<br />
						<Text as='span' color='primary.500'>
							{t.subscription_modal.join_color}
						</Text>
					</Text>
					<form
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							width: '100%'
						}}
						onSubmit={handleSubmitEmail}>
						<Input
							marginY='1.5rem'
							marginTop={['0.5rem', '2rem']}
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
							fontSize='16px'
							fontWeight='semibold'
							color='white'
							bg={isSuccess ? 'green.500' : 'primary.500'}
							borderRadius='5px'
							minWidth='7.5rem'
							height='2.5rem'
							_hover={{ bg: `${isSuccess ? 'green.500' : 'primary.500'}` }}
							_active={{
								bg: `${isSuccess ? 'green.500' : 'primary.500'}`,
								transform: 'scale(0.98)',
								borderColor: '#bec3c9'
							}}
							_focus={{
								boxShadow:
									'0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)'
							}}>
							{isLoading ? (
								<Spinner />
							) : isSuccess ? (
								t.button_success
							) : (
								t.subscription_modal.access
							)}
						</Button>
					</form>
				</Box>
			</ModalContent>
		</Modal>
	)
}

export default SubscriptionModal
