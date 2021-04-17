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

function getFontSize(windowWidth) {
  console.log(windowWidth)
  if (windowWidth >= 1200) return 13
  if (windowWidth >= 1100) return 10
  if (windowWidth >= 1000) return 9
  if (windowWidth > 600 && windowWidth < 1000) return 13
  if (windowWidth > 400 && windowWidth <= 600) return 7
  if (windowWidth < 330) return 5.5
  return 6
}

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
  const fontSize = getFontSize(windowWidth)
  return (
    <MediaContextProvider>
      <BlocksContext.Provider value={{ builder: userBlocksData, rowHeight }}>
        <Media lessThan="lg">
          <Box
            d="grid"
            gridTemplateColumns={`repeat(${GRID_COLUMNS / 2}, 1fr)`}
            gridTemplateRows={`repeat( auto-fill,  ${rowHeight * 2}px )`}
            w="101vw"
            height={
              (getPageRows(userBlocksData.mobileLayout) - 1) * rowHeight * 2
            }
            overflowX="hidden"
            fontSize={`${fontSize}px`}
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
        <Media greaterThanOrEqual="lg">
          <Box
            d="grid"
            gridTemplateColumns={`repeat(${GRID_COLUMNS}, 1fr)`}
            gridTemplateRows={`repeat( auto-fill,  ${rowHeight}px )`}
            w="101vw"
            height={(getPageRows(userBlocksData.layouts) - 1) * rowHeight}
            overflowX="hidden"
            fontSize={`${fontSize}px`}
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
