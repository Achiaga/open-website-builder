import { useCallback, useEffect, useState } from 'react'
import localforage from 'localforage'
import { Box } from '@chakra-ui/react'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { WebBuilder } from '../builder/web-builder'
import { BuilderSidebar } from '../builder/sidebar'
// import bacgroundSVG from './bacground.svg'

export function normalizeLayout(userBlocksData) {
	if (!userBlocksData) return []
	return Object.values(userBlocksData).map((block) => {
		return block.layout
	})
}
export function normalizeBlockStructure(userBlocksData) {
	if (!userBlocksData) return {}
	return Object.entries(userBlocksData).reduce((acc, [blockId, value]) => {
		return {
			...acc,
			[blockId]: value.block
		}
	}, {})
}

function removeEventListener(blockConfig) {
	// eslint-disable-next-line no-unused-vars
	const { editBlock, ...rest } = blockConfig.data
	return {
		...blockConfig,
		data: {
			...rest
		}
	}
}

function denormalizeBlockData(layout, blocksConfig) {
	return Object.entries(blocksConfig).reduce((acc, [blockKey, blockConfig]) => {
		return {
			...acc,
			[blockKey]: {
				layout: {
					...layout.find((layoutItem) => layoutItem.i === blockKey)
				},
				block: {
					...removeEventListener(blockConfig)
				}
			}
		}
	}, {})
}

function saveOnLocal(userBlocksData, setIsSaved) {
	if (!Object.keys(userBlocksData).length) return
	setIsSaved(false)
	localforage.setItem('userData', userBlocksData).then(() => {
		setIsSaved(true)
		console.log(JSON.stringify(userBlocksData))
		console.log('succesfully saved')
	})
}

const SAVE_TIME = 5000

const Builder = ({ userBlocksData }) => {
	const [newBlockType, setNewBlockType] = useState(null)
	const [isSaved, setIsSaved] = useState(true)

	const [blocksConfig, udpateBlocksConfig] = useState(() =>
		normalizeBlockStructure(userBlocksData)
	)
	const [layout, setLayout] = useState(() => normalizeLayout(userBlocksData))

	const debouncedSaved = useCallback(
		debounce((layout, blocksConfig) => {
			saveOnLocal(denormalizeBlockData(layout, { ...blocksConfig }), setIsSaved)
		}, SAVE_TIME),
		[]
	)

	useEffect(() => {
		debouncedSaved(layout, blocksConfig)
	}, [layout, blocksConfig])

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
				layout={layout}
				blocksConfig={blocksConfig}
				newBlockType={newBlockType}
				udpateBlocksConfig={udpateBlocksConfig}
				updateLayout={setLayout}
			/>
		</Box>
	)
}

Builder.propTypes = {
	userBlocksData: PropTypes.any
}

export default Builder
