import { useState } from 'react';

import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { WebBuilder } from '../builder/web-builder';
import { BuilderSidebar } from '../builder/sidebar';

const Builder = ({ userBlocksData }) => {
	const [isSaved, setIsSaved] = useState(true);
	const [newBlockType, setNewBlockType] = useState(null);
	return (
		<Box
			d='flex'
			m='auto'
			flexDir='row'
			bg={`url("./background.svg")`}
			backgroundRepeat='no-repeat'
			backgroundSize='cover'
			backgroundPosition='center center'
			height='500vw'>
			<BuilderSidebar setNewBlockType={setNewBlockType} isSaved={isSaved} />
			<WebBuilder
				setIsSaved={setIsSaved}
				newBlockType={newBlockType}
				userBlocksData={userBlocksData}
			/>
		</Box>
	);
};

Builder.propTypes = {
	userBlocksData: PropTypes.any,
};

export default Builder;
