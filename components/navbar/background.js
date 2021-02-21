import { Box } from '@chakra-ui/react';
import BgCircle from '../../assets/navbar-circle';
import LogoSvg from '../../assets/logo';

const BackgroundCircles = () => {
	return (
		<>
			<Box pos='absolute' right={-79} top={-92}>
				<BgCircle />
			</Box>
			<Box pos='relative' pt={[0, 4]} w={[10, 14]}>
				<LogoSvg w='full' />
			</Box>
		</>
	);
};

export default BackgroundCircles;
