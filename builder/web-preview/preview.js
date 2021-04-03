import { useEffect, useState, createContext } from 'react'
import { GeneratePreviewBlock } from './helpers'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'
import { GRID_COLUMNS } from '../web-builder/constants'
import MadeWith from '../../components/made-with'

export const BlocksContext = createContext()

export const ResumeWebsite = ({ userBlocksData }) => {
  const [windowWidth, setWindowWidth] = useState(1440)

  function handleWindowResize() {
    setWindowWidth(window?.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
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
        height="7500px"
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
