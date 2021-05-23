import { createContext } from 'react'
import PropTypes from 'prop-types'

import MadeWith from '../../components/made-with'

import { GeneratePreviewBlock } from './helpers'
import { MobileWindowWidth } from '../web-builder/web-builder'

export const BlocksContext = createContext()

function getFontSize(windowWidth) {
  if (windowWidth >= 1100) return 13
  return 10
}

export const ResumeWebsite = ({ userBlocksData, projectId }) => {
  const fontSize = getFontSize(1440)
  const mobileFont = getFontSize(MobileWindowWidth)

  return (
    <BlocksContext.Provider value={{ builder: userBlocksData, projectId }}>
      <div>
        <div
          className="mobile"
          style={{
            display: 'block',
            overflowX: 'hidden',
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
                desktop
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
