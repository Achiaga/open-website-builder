import { useEffect, useState, createContext } from 'react'
import PropTypes from 'prop-types'
import { createMedia } from '@artsy/fresnel'

import { GRID_COLUMNS } from '../web-builder/constants'
import MadeWith from '../../components/made-with'

import { GeneratePreviewBlock } from './helpers'
import { MobileWindowWidth } from '../web-builder/web-builder'

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
  if (windowWidth >= 1100) return 13
  return 10
}

export const ResumeWebsite = ({ userBlocksData, projectId }) => {
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
  const mobileRowHeight = MobileWindowWidth / 100
  const fontSize = getFontSize(windowWidth)
  const mobileFont = getFontSize(MobileWindowWidth)
  console.log((getPageRows(userBlocksData.mobileLayout) - 1) * mobileRowHeight)
  return (
    <BlocksContext.Provider
      value={{ builder: userBlocksData, rowHeight, mobileRowHeight, projectId }}
    >
      <div>
        <div
          className="mobile"
          style={{
            display: 'block',
            overflowX: 'hidden',
            // gridTemplateColumns: `repeat(100, 1fr)`,
            // gridTemplateRows: `repeat( auto-fill,  ${mobileRowHeight}px )`,
            height: '100vh',
            width: '100vw',
            fontSize: `${mobileFont}px`,
          }}
        >
          {userBlocksData.mobileLayout?.map((layoutItem) => {
            return (
              <GeneratePreviewBlock
                key={layoutItem.i}
                layoutItem={layoutItem}
                rowHeight={mobileRowHeight}
              />
            )
          })}
        </div>
      </div>

      <div>
        <div
          className="desktop"
          style={{
            display: 'block',
            overflowX: 'hidden',
            // gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`,
            // gridTemplateRows: `repeat( auto-fill,  ${rowHeight}px )`,
            // height: (getPageRows(userBlocksData.layouts) - 1) * rowHeight,
            height: '100vh',
            width: '100vw',
            fontSize: `${fontSize}px`,
          }}
        >
          {userBlocksData.layouts?.map((layoutItem) => {
            return (
              <GeneratePreviewBlock
                key={layoutItem.i}
                layoutItem={layoutItem}
                rowHeight={rowHeight}
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
