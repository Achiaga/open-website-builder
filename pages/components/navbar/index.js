import { Box, Select } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from '../../../hooks/translation'

import { AnalyticsEvent } from '../../../utils/analytics'
import BgCircle from '../../../assets/navbar-circle'
import Button from '../../../Components/Button'
import LogoSvg from '../../../assets/logo'
import SubscriptionModal from '../modals/subscription-modal'
import { useState } from 'react'

const Navbar = () => {
	const router = useRouter()
	const { locale } = router
	const [t] = useTranslation()
	const [isModalOpen, toggleModalOpen] = useState(false)

	const changeLanguage = (e) => {
		const locale = e.target.value
		router.push(router.pathname, router.asPath, { locale })
	}

	const handleFreeTrial = () => {
		toggleModalOpen(true)
		AnalyticsEvent('Free Trial', 'clicked')
	}

	return (
		<Box
			display='flex'
			justifyContent='space-between'
			alignItems='center'
			width='100%'
			height={['70px', '100px']}
			paddingRight={['1rem', '7rem']}
			paddingLeft={['1rem', '6rem']}
			fontFamily='Montserrat'>
			{isModalOpen && (
				<SubscriptionModal
					isModalOpen={isModalOpen}
					toggleModalOpen={toggleModalOpen}
				/>
			)}
			<Box position='absolute' right='-79px' top='-92px'>
				<BgCircle />
			</Box>
			<Box paddingTop={[0, '1rem']} position='relative' width={'40px'}>
				<LogoSvg />
			</Box>
			<Box
				position='relative'
				fontSize={['12px', 'md']}
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
				{/* <Button background='transparent' border='none'>
					Templates
				</Button>
				<Button background='transparent' border='none'>
					Pricing
				</Button>
				<Button background='transparent' border='none'>
					Feaures
				</Button> */}
				<Select
					cursor='pointer'
					border='none'
					background='none'
					width='70px'
					fontSize='lg'
					marginRight='1.5rem'
					onChange={changeLanguage}
					defaultValue={locale}
					className='text-white text-shadow-sm text-lg bg-transparent tracking-wide'>
					<option className='text-black' value='en'>
						en
					</option>
					<option className='text-black' value='es'>
						es
					</option>
				</Select>
				<Button fontSize={['14px', 'md']} onClick={handleFreeTrial}>
					{t.navbar.buttonTrial}
				</Button>
			</Box>
		</Box>
	)
}

export default Navbar
