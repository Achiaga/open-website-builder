import { Box, Spinner, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import { GrAdd, GrClose } from 'react-icons/gr';
import {
	BsTextCenter,
	BsCardImage,
	BsLayoutTextWindowReverse,
} from 'react-icons/bs';

const ToolSection = ({ Icon, text, type, setNewBlockType, ...props }) => {
	return (
		<Box
			as='div'
			h='40px'
			w='full'
			backgroundColor='transparent'
			marginBottom='0.4rem'
			display='flex'
			alignItems='center'
			justifyContent='left'
			rounded='10px'
			padding='5px'
			paddingX='10px'
			border='1px solid'
			className='droppable-element'
			draggable={true}
			unselectable='on'
			cursor='grab'
			onDragStart={(e) => {
				e.dataTransfer.setData('text/plain', '');
				setNewBlockType(type);
			}}
			{...props}>
			<Icon size='1.3rem' />
			<Text as='span' fontSize='16px' paddingLeft='0.6rem'>
				{text}
			</Text>
		</Box>
	);
};

const BuilderSidebar = ({ setNewBlockType, isSaved }) => {
	const [isOpen, setIsOpen] = useState(false);

	if (!isOpen)
		return (
			<Box
				pos='fixed'
				top='10px'
				right='10px'
				zIndex='9999'
				border='1px solid transparent'
				borderRadius='10px'
				w='60px'
				h='60px'
				bg='white'
				justifyContent='center'
				d='flex'
				alignItems='center'
				cursor='pointer'
				boxShadow='0 13px 27px -5px rgba(50,50,93,0.25),0 8px 16px -8px rgba(0,0,0,0.3)'
				_hover={{
					bg: 'primary.100',
					border: '1px solid',
					borderColor: 'primary.500',
				}}
				onClick={() => setIsOpen(true)}>
				<GrAdd size='2.2em' />
			</Box>
		);
	return (
		<Box
			d='flex'
			flexDir='column'
			pos='fixed'
			top='10px'
			right='10px'
			zIndex='9999'
			bg='white'
			p='10px'
			boxShadow='0 13px 27px -5px rgba(50,50,93,0.25),0 8px 16px -8px rgba(0,0,0,0.3)'
			borderRadius='10px'>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				w='full'
				paddingBottom='0.9rem'>
				<Box fontSize='16px'></Box>
				<Box cursor='pointer' onClick={() => setIsOpen(false)}>
					<GrClose size='1em' />
				</Box>
			</Box>
			<ToolSection
				Icon={BsTextCenter}
				text='Text'
				type='text'
				setNewBlockType={setNewBlockType}
			/>
			<ToolSection
				Icon={BsCardImage}
				text='Image'
				type='image'
				setNewBlockType={setNewBlockType}
			/>
			<ToolSection
				Icon={BsLayoutTextWindowReverse}
				text='Section'
				type='inception'
				setNewBlockType={setNewBlockType}
			/>
		</Box>
	);
};

BuilderSidebar.propTypes = {
	setNewBlockType: PropTypes.any,
	isSaved: PropTypes.any,
};
ToolSection.propTypes = {
	setNewBlockType: PropTypes.func,
	Icon: PropTypes.any,
	text: PropTypes.string,
	type: PropTypes.string,
};

export default BuilderSidebar;
