import { useEffect, useState } from 'react'
import { generatePageCode } from '../helpers'
import PropTypes from 'prop-types'

const WebPreview = ({ layout, blocksConfig }) => {
	const [pageDesign, setPageDesign] = useState(null)

	useEffect(() => {
		setPageDesign(generatePageCode(layout, blocksConfig))
	}, [layout, blocksConfig])

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(10, 1fr)',
				gridTemplateRows: 'repeat(10, 1fr)',
				width: '50vw',
				height: '100vh',
				borderLeft: '1px solid black'
			}}>
			{pageDesign}
		</div>
	)
}

WebPreview.propTypes = {
	layout: PropTypes.any,
	blocksConfig: PropTypes.any
}

export default WebPreview
