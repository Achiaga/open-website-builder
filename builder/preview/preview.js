import { useEffect, useState } from 'react'
import { generatePageCode } from '../helpers'

const WebPreview = ({ layout, layoutBlocks }) => {
	const [pageDesign, setPageDesign] = useState(null)

	useEffect(() => {
		setPageDesign(generatePageCode(layout, layoutBlocks))
	}, [layout, layoutBlocks])

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

export default WebPreview
