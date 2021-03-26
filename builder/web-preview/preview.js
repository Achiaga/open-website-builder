import { useEffect, useState, createContext } from 'react'
import { GeneratePreviewBlock } from './helpers'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'
import { GRID_COLUMNS, ROW_HEIGHT } from '../web-builder/constants'
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
  const childStructure = userBlocksData.structure['main']
  return (
    <BlocksContext.Provider value={{ builder: userBlocksData, rowHeight }}>
      <Box
        p="10px"
        d="grid"
        gridTemplateColumns={`repeat(${GRID_COLUMNS}, 1fr)`}
        gridTemplateRows={`repeat( auto-fill,  ${rowHeight}px )`}
        w="100vw"
        height="7500px"
      >
        {childStructure?.map((structItem) => {
          return (
            <GeneratePreviewBlock key={structItem} structItem={structItem} />
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
