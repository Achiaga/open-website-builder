import { Box } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useEffect, useState } from 'react'
import { getUserDataFromLS } from '../../features/helper'
import ResumeWebsite from '../../preview/web-preview/preview'

function ResumePreview() {
  const [blocksData, setBlocksData] = useState(null)

  async function loadData() {
    const blocksData = await getUserDataFromLS()
    setBlocksData(blocksData)
  }
  useEffect(() => {
    loadData()
  }, [])

  if (!blocksData) {
    return (
      <Box
        w="100%"
        h="100vh"
        d="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" thickness="4px" color="primary.500" speed="0.65s" />
      </Box>
    )
  }

  return <ResumeWebsite userBlocksData={blocksData} />
}

export default ResumePreview
