import { useState } from 'react';
import { Box } from '@chakra-ui/react';

import { AnalyticsEvent } from '../../utils/analytics';

import Navbar from '../../components/navbar';
import { SubscriptionModal } from '../../components/modals';
import Hero from '../../components/hero';
import Comparison from '../../components/comparison';
import Features from '../../components/features';
import Steps from '../../components/steps';
import CardInfo from '../../components/card-info';
import Footer from '../../components/footer';

const LandingPage = () => {
	const [isModalOpen, toggleModalOpen] = useState(false);

	const handleFreeTrial = () => {
		toggleModalOpen(true);
		AnalyticsEvent('Modal Opened', 'clicked');
	};

	return (
		<Box
			display='flex'
			flex='1'
			flexDirection='column'
			justifyContent='start'
			alignItems='center'
			w='full'>
			{isModalOpen && (
				<SubscriptionModal
					isModalOpen={isModalOpen}
					toggleModalOpen={toggleModalOpen}
				/>
			)}
			<Navbar handleFreeTrial={handleFreeTrial} />
			<Hero handleFreeTrial={handleFreeTrial} />
			<Comparison />
			<Features handleFreeTrial={handleFreeTrial} />
			<Steps />
			<CardInfo />
			<Footer />
		</Box>
	);
};

export default LandingPage;
