import { Box } from '@chakra-ui/react';
import UnsexyBg from '../../assets/unsexy-circle';
import SexyBg from '../../assets/sexy-circle';

const BackgroundCircles = () => {
	return (
		<>
			<Box
				display={['none', 'block']}
				position='absolute'
				left='0'
				top='1rem'
				d={['none', 'block']}>
				<UnsexyBg />
			</Box>
			<Box
				display={['none', 'block']}
				position='absolute'
				right='0'
				top='12rem'>
				<SexyBg />
			</Box>
		</>
	);
};

export default BackgroundCircles;
