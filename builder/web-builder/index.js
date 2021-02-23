import React from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const ReactGridLayout = WidthProvider(RGL)

const WebBuilder = ({
	onLayoutChange,
	layout,
	Layouts,
	onDrop,
	isDroppable
}) => {
	return (
		<div
			style={{
				display: 'flex',
				width: '50vw',
				margin: 'auto',
				flexDirection: 'row'
			}}>
			<ReactGridLayout
				cols={10}
				rowHeight={50}
				onDrop={onDrop}
				isDroppable={isDroppable}
				style={{ width: '500px', height: '100vh' }}
				className='layout'
				layout={layout}
				onLayoutChange={onLayoutChange}>
				{Layouts}
			</ReactGridLayout>
		</div>
	)
}

export default WebBuilder
