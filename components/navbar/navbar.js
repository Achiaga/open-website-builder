import { Flex, Select } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useTranslation } from '../../hooks/translation';
import { AnalyticsEvent } from '../../utils/analytics';
import Button from '../commun/button';
import NavButton from './nav-button';

import BackgroundCircles from './background';

const Navbar = ({ handleFreeTrial }) => {
	const router = useRouter();
	const { locale } = router;
	const [t] = useTranslation();

	const changeLanguage = (e) => {
		const locale = e.target.value;
		router.push(router.pathname, router.asPath, { locale });
	};

	const handleStartNow = (e) => {
		AnalyticsEvent('modal_open', 'navbar');
		// handleFreeTrial(e);
		router.push(`/builder`);
	};

	const handleNavRouting = (e) => {
		const { id } = e.target;
		router.push(`/${id}`);
	};

	return (
		<Flex
			w='100%'
			h={[70, 100]}
			pr={[4, 28]}
			pl={[4, 24]}
			pt={[4, 0]}
			justify='space-between'
			align='center'
			fontFamily='Montserrat'>
			<BackgroundCircles />
			<Flex
				pos='relative'
				justify='space-between'
				align='center'
				color='black'
				fontSize={['sm', 'md']}>
				<NavButton
					onClick={handleNavRouting}
					content='Templates'
					id='templates'
				/>
				<NavButton onClick={handleNavRouting} content='Pricing' id='pricing' />
				<NavButton onClick={handleNavRouting} content='About Us' id='about' />
				<Select
					border='none'
					bg='none'
					mr={6}
					w='4.5rem'
					fontSize='lg'
					cursor='pointer'
					fontWeight='500'
					onChange={changeLanguage}
					defaultValue={locale}>
					<option color='black' value='en'>
						en
					</option>
					<option color='black' value='es'>
						es
					</option>
				</Select>
				<Button
					mr='1rem'
					fontSize='lg'
					minW='7.5rem'
					h={12}
					onClick={handleStartNow}>
					Login
				</Button>
				<Button fontSize='lg' minW='7.5rem' h={12} onClick={handleStartNow}>
					{t.navbar.startNowButton}
				</Button>
			</Flex>
		</Flex>
	);
};

export default Navbar;
