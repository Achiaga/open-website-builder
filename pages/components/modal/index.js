import { Box } from '@chakra-ui/react';

const Modal = ({ toggleModalOpen, children }) => {
	const handleClickAway = (e) => {
		e.stopPropagation();
		toggleModalOpen(false);
	};
	return (
		<Box
			pos='absolute'
			top='0'
			left='0'
			display='flex'
			justifyContent='center'
			alignItems='center'
			width='100vw'
			height='100vh'
			background='#4c4c4c73'
			padding='2rem'
			zIndex='1'
			onClick={handleClickAway}>
			{children}
		</Box>
	);
};

export default Modal;
