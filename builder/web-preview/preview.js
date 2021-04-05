import { useEffect, useState, createContext } from 'react'
import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { createMedia } from '@artsy/fresnel'

import { GRID_COLUMNS } from '../web-builder/constants'
import MadeWith from '../../components/made-with'

import { GeneratePreviewBlock } from './helpers'

export const BlocksContext = createContext()

function getPageRows(layouts) {
  return layouts.reduce((max, item) => {
    const heightSum = item.y + item.h
    if (heightSum > max) return heightSum
    return max
  }, 0)
}

export const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 768,
    lg: 1024,
    xl: 1192,
  },
})

export const ResumeWebsite = ({ userBlocksData }) => {
  const [windowWidth, setWindowWidth] = useState(1440)

  function handleWindowResize() {
    setWindowWidth(window?.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    handleWindowResize()
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  const rowHeight = windowWidth / GRID_COLUMNS
  return (
    <MediaContextProvider>
      <BlocksContext.Provider value={{ builder: userBlocksData, rowHeight }}>
        <Media lessThan="md">
          <Box
            d="grid"
            gridTemplateColumns={`repeat(${GRID_COLUMNS / 2}, 1fr)`}
            gridTemplateRows={`repeat( auto-fill,  ${rowHeight * 2}px )`}
            w="101vw"
            height={
              (getPageRows(userBlocksData.mobileLayout) - 1) * rowHeight * 2
            }
            overflowX="hidden"
          >
            {userBlocksData.mobileLayout?.map((layoutItem) => {
              return (
                <GeneratePreviewBlock
                  key={layoutItem.i}
                  layoutItem={layoutItem}
                />
              )
            })}
          </Box>
        </Media>
        <Media greaterThanOrEqual="md">
          <Box
            d="grid"
            gridTemplateColumns={`repeat(${GRID_COLUMNS}, 1fr)`}
            gridTemplateRows={`repeat( auto-fill,  ${rowHeight}px )`}
            w="101vw"
            height={(getPageRows(userBlocksData.layouts) - 1) * rowHeight}
            overflowX="hidden"
          >
            {userBlocksData.layouts?.map((layoutItem) => {
              return (
                <GeneratePreviewBlock
                  key={layoutItem.i}
                  layoutItem={layoutItem}
                />
              )
            })}
          </Box>
        </Media>
        <MadeWith />
      </BlocksContext.Provider>
    </MediaContextProvider>
  )
}

ResumeWebsite.propTypes = {
  userBlocksData: PropTypes.any,
}
