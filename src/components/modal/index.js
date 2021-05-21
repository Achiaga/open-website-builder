import { Modal as ModalContainer, ModalOverlay } from '@chakra-ui/react';

const Modal = ({ isOpen, onClose, children, ...props }) => {
	return (
		<ModalContainer isOpen={isOpen} onClose={() => onClose(false)}>
			<ModalOverlay />
			{children}
		</ModalContainer>
	);
};

export default Modal;
