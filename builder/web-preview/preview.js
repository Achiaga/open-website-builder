import { useEffect, useState } from 'react'
import { generatePageCode } from './helpers'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

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
			gridTemplateRows='repeat(14, 1fr)'
			w='500px'
			h='100vh'
			border='1px solid black'>
			{pageDesign}
		</Box>
	)
}

WebPreview.propTypes = {
	layout: PropTypes.any,
	blocksConfig: PropTypes.any
}

export default WebPreview
