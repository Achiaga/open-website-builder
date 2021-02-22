import { Flex, Select } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useTranslation } from '../../hooks/translation';
import { AnalyticsEvent } from '../../utils/analytics';
import Button from '../commun/button';

import BackgroundCircles from './background';

const Navbar = ({ handleFreeTrial }) => {
	const router = useRouter();
	const { locale } = router;
	const [t] = useTranslation();

	const changeLanguage = (e) => {
		const locale = e.target.value;
		router.push(router.pathname, router.asPath, { locale });
	};

	const handleButton = (e) => {
		AnalyticsEvent('modal_open', 'navbar');
		handleFreeTrial(e);
	};

	return (
		<Flex
			w='100%'
			h={[70, 100]}
			pr={[4, 28]}
			pl={[4, 24]}
			pt={[8, 0]}
			justify='space-between'
			align='center'
			fontFamily='Montserrat'>
			<BackgroundCircles />
			<Flex
				pos='relative'
				justify='space-between'
				align='center'
				fontSize={['sm', 'md']}>
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
					border='none'
					bg='none'
					mr={6}
					w='4.5rem'
					fontSize='lg'
					cursor='pointer'
					onChange={changeLanguage}
					defaultValue={locale}>
					<option color='black' value='en'>
						en
					</option>
					<option color='black' value='es'>
						es
					</option>
				</Select>
				<Button fontSize='lg' minW='7.5rem' h={12} onClick={handleButton}>
					{t.navbar.buttonTrial}
				</Button>
			</Flex>
		</Flex>
	);
};

export default Navbar;
