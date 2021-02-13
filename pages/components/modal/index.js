import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';

const Modal = ({ toggleModalOpen, children, ...props }) => {
	// const handleClickAway = (e) => {
	// 	document.body.style.overflow = 'auto'; // ADD THIS LINE
	// 	document.body.style.height = '100%'; // ADD THIS LINE
	// 	e.stopPropagation();
	// 	toggleModalOpen(false);
	// };
	// useEffect(() => {
	// 	document.body.style.overflow = 'hidden'; // ADD THIS LINE
	// 	document.body.style.height = '100vh'; // ADD THIS LINE
	// }, []);
	return (
		<Box
			pos='fixed'
			top='0'
			left='0'
			display='flex'
			justifyContent='center'
			alignItems='center'
			width='100vw'
			height='100vh'
			overflow='auto'
			background='#4c4c4c73'
			padding='2rem'
			zIndex='1'
			onScroll={(e) => {
				console.log('scrolling');
				e.stopPropagation();
			}}
			// onClick={handleClickAway}
			{...props}>
			{children}
		</Box>
	);
};

export default Modal;
