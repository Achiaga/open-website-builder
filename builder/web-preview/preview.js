import { useEffect, useState, createContext } from 'react'
import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import { GRID_COLUMNS } from '../web-builder/constants'
import MadeWith from '../../components/made-with'

import { GeneratePreviewBlock } from './helpers'

export const BlocksContext = createContext()

function getPageColumns(layouts) {
  return layouts.reduce((max, item) => {
    const heightSum = item.y + item.h
    if (heightSum > max) return heightSum
    return max
  }, 0)
}

export const ResumeWebsite = ({ userBlocksData }) => {
  const [windowWidth, setWindowWidth] = useState(1440)

  function handleWindowResize() {
    setWindowWidth(window?.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    getPageColumns(userBlocksData.layouts)
    handleWindowResize()
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  const rowHeight = windowWidth / GRID_COLUMNS
  return (
    <BlocksContext.Provider value={{ builder: userBlocksData, rowHeight }}>
      <Box
        d="grid"
        gridTemplateColumns={`repeat(${GRID_COLUMNS}, 1fr)`}
        gridTemplateRows={`repeat( auto-fill,  ${rowHeight}px )`}
        w="101vw"
        height={(getPageColumns(userBlocksData.layouts) - 1) * rowHeight}
        overflowX="hidden"
      >
        {userBlocksData.layouts?.map((layoutItem) => {
          return (
            <GeneratePreviewBlock key={layoutItem.i} layoutItem={layoutItem} />
          )
        })}
      </Box>
      <MadeWith />
    </BlocksContext.Provider>
  )
}

ResumeWebsite.propTypes = {
  userBlocksData: PropTypes.any,
}
