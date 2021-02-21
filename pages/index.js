import { Box } from '@chakra-ui/react';

import Header from './header';
import LandingPage from './landing-page';

export default function Home() {
	return (
		<Box
			minHeight='100vh'
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
			maxWidth='100vw'>
			<Header />
			<LandingPage />
		</Box>
	);
}
