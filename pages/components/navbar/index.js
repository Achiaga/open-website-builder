import { Box, Select } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useTranslation } from '../../../hooks/translation';

import { AnalyticsEvent } from '../../../utils/analytics';
import BgCircle from '../../../assets/navbar-circle.js';
import Button from '../../../Components/Button';
import LogoSvg from '../../../assets/logo.js';
import SubscriptionModal from '../modals/subscription-modal';
import { useState } from 'react';

const Navbar = () => {
	const router = useRouter();
	const { locale } = router;
	const [t] = useTranslation();
	const [isModalOpen, toggleModalOpen] = useState(false);

	const changeLanguage = (e) => {
		const locale = e.target.value;
		router.push(router.pathname, router.asPath, { locale });
	};

	const handleFreeTrial = () => {
		toggleModalOpen(true);
		AnalyticsEvent('Free Trial', 'clicked');
	};

	return (
		<Box
			display='flex'
			justifyContent='space-between'
			alignItems='center'
			width='100%'
			height='100px'
			paddingRight='7rem'
			paddingLeft='6rem'
			fontFamily='Montserrat'>
			{isModalOpen && (
				<SubscriptionModal
					isModalOpen={isModalOpen}
					toggleModalOpen={toggleModalOpen}
				/>
			)}
			<Box zIndex='-1' position='absolute' right='-79px' top='-92px'>
				<BgCircle />
			</Box>
			<Box zIndex='-1' paddingTop='1rem'>
				<LogoSvg />
			</Box>
			<Box
				fontSize='md'
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
				<Button onClick={handleFreeTrial}>{t.navbar.buttonTrial}</Button>
			</Box>
		</Box>
	);
};

export default Navbar;
