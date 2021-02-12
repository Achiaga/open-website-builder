import { Box, Select } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useTranslation } from '../../../hooks/translation';

import Button from '../../../Components/Button';
import LogoSvg from '../../../assets/logo.tsx';
import BgCircle from '../../../assets/navbar-circle.tsx';

const Navbar = () => {
	const router = useRouter();
	const { locale } = router;
	const [t] = useTranslation();

	const changeLanguage = (e) => {
		const locale = e.target.value;
		router.push(router.pathname, router.asPath, { locale });
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
			<Box position='absolute' right='-79px' top='-92px'>
				<BgCircle />
			</Box>
			<Box paddingTop='1rem'>
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
				<Button>{t.navbar.buttonTrial}</Button>
			</Box>
		</Box>
	);
};

export default Navbar;
