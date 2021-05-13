import { useEffect, useState, createContext } from 'react'
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
  if (windowWidth >= 1200) return 13
  if (windowWidth >= 1100) return 10
  if (windowWidth >= 1000) return 9
  if (windowWidth > 600 && windowWidth < 1000) return 13
  if (windowWidth > 400 && windowWidth <= 600) return 7
  if (windowWidth < 380) return 5.7
  return 6
}

export const ResumeWebsite = ({ userBlocksData, websiteId }) => {
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
  const mobileRowHeight = 400 / (GRID_COLUMNS / 2)
  const fontSize = getFontSize(windowWidth)
  const mobileFont = getFontSize(400)

  return (
    <BlocksContext.Provider
      value={{ builder: userBlocksData, rowHeight, websiteId }}
    >
      <div>
        <div
          className="mobile"
          style={{
            display: 'grid',
            overflowX: 'hidden',
            gridTemplateColumns: `repeat(${GRID_COLUMNS / 2}, 1fr)`,
            gridTemplateRows: `repeat( auto-fill,  ${mobileRowHeight}px )`,
            height:
              (getPageRows(userBlocksData.mobileLayout) - 1) * mobileRowHeight,
            width: '101vw',
            fontSize: `${mobileFont}px`,
          }}
        >
          {userBlocksData.mobileLayout?.map((layoutItem) => {
            return (
              <GeneratePreviewBlock
                key={layoutItem.i}
                layoutItem={layoutItem}
              />
            )
          })}
        </div>
      </div>

      <div>
        <div
          className="desktop"
          style={{
            display: 'grid',
            overflowX: 'hidden',
            gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`,
            gridTemplateRows: `repeat( auto-fill,  ${rowHeight}px )`,
            height: (getPageRows(userBlocksData.layouts) - 1) * rowHeight,
            width: '100vw',
            fontSize: `${fontSize}px`,
          }}
        >
          {userBlocksData.layouts?.map((layoutItem) => {
            return (
              <GeneratePreviewBlock
                key={layoutItem.i}
                layoutItem={layoutItem}
              />
            )
          })}
        </div>
      </div>

      <MadeWith />
    </BlocksContext.Provider>
  )
}

ResumeWebsite.propTypes = {
  userBlocksData: PropTypes.any,
}
