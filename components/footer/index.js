import { useState } from 'react';
import Link from 'next/link';
import { Box, Input, Spinner } from '@chakra-ui/react';
import { useTranslation } from '../../hooks/translation';
import { addUserToBetaList } from '../../helpers/transport';

import LogoSvg from '../../assets/logo';
import Button from '../commun/Button';
import Twitter from '../../assets/twitter';
import { AnalyticsEvent } from '../../utils/analytics';

const Features = () => {
	const [t] = useTranslation();
	const [emailValue, setEmailValue] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmitEmail = (e) => {
		e.preventDefault();
		if (isLoading || !emailValue) return;
		setIsLoading(true);
		AnalyticsEvent('signup', 'footer');
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
	};

	return (
		<Box
			position='relative'
			display='flex'
			justifyContent='center'
			alignItems='center'
			width='100%'
			height={['100px', '220px']}
			marginTop={['0rem', '10rem']}>
			<Box pos='absolute' left='4rem'>
				<LogoSvg />
			</Box>
			<Box width={['200px', '537px']} d={['none', 'block']}>
				<Box as='form' onSubmit={handleSubmitEmail}>
					<Box
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
							value={emailValue}
							onChange={handleEmail}
						/>
						<Button
							type='submit'
							w='212px'
							fontSize='18px'
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
								t.footer.button
							)}
						</Button>
					</Box>
				</Box>
			</Box>
			<Box
				pos='absolute'
				w='80px'
				right='4rem'
				display='flex'
				justifyContent='space-between'
				alignItems='center'>
				<Link href='https://twitter.com/ResumesStandout' passHref={true}>
					<Button padding='0' border='none' bg='transparent'>
						<Twitter />
					</Button>
				</Link>
			</Box>
		</Box>
	);
};

export default Features;
