import { useEffect, useState } from 'react'
import { generatePageCode } from './helpers'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'
import { GRID_COLUMNS, ROW_HEIGHT } from '../web-builder/constants'
import {
	normalizeBlockStructure,
	normalizeLayout
} from '../web-builder/helpers'

const WebPreview = ({ layout, blocksConfig }) => {
	const [pageDesign, setPageDesign] = useState(null)

	useEffect(() => {
		setPageDesign(generatePageCode(layout, blocksConfig))
	}, [layout, blocksConfig])

	return (
		<Box
			p='10px'
			d='grid'
			gridTemplateColumns='repeat(10, 1fr)'
			gridTemplateRows={`repeat( auto-fill, ${ROW_HEIGHT}px )`}
			gridGap={'10px'}
			w='500px'
			h='1500px'
			border='1px solid black'>
			{pageDesign}
		</Box>
	)
}

WebPreview.propTypes = {
	layout: PropTypes.any,
	blocksConfig: PropTypes.any
}

export const ResumeWebsite = ({ userBlocksData }) => {
	const [windowWidth, setWindowWidth] = useState(1440)

	function handleWindowResize() {
		setWindowWidth(window?.innerWidth)
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize)
		return () => window.removeEventListener('resize', handleWindowResize)
	}, [])

	const rowHeight = windowWidth / GRID_COLUMNS

	return (
		<Box
			p='10px'
			d='grid'
			gridTemplateColumns={`repeat(${GRID_COLUMNS}, 1fr)`}
			gridTemplateRows={`repeat( auto-fill,  ${rowHeight}px )`}
			w='100vw'
			height='7500px'>
			{generatePageCode(
				normalizeLayout(userBlocksData),
				normalizeBlockStructure(userBlocksData),
				rowHeight
			)}
		</Box>
	)
}

ResumeWebsite.propTypes = {
	userBlocksData: PropTypes.any
}

export default WebPreview
