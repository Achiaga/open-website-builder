import { Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { WebBuilder } from '../builder/web-builder'
import { BuilderSidebar } from '../builder/sidebar'
import { getBuilderData } from '../features/builderSlice'
import { SettingsBar } from './sidebar/settingsBar'

const Builder = () => {
  const userBlocksData = useSelector(getBuilderData)

  if (!userBlocksData) return <div>Loading...</div>
  return (
    <Box
      d="flex"
      m="auto"
      flexDir="row"
      // bg={`url("./background.svg")`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center center"
      height="500vw"
    >
      <SettingsBar />
      <BuilderSidebar />
      <WebBuilder />
    </Box>
  )
}

export default Builder
