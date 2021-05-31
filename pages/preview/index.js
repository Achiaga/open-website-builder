import { Box } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { ResumeWebsite } from '../../builder/web-preview/preview'
import { getUserDataFromLS } from '../../features/helper'
import { hasFlurlyLink } from '../[resumeId]'

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
  const hasFlurly = hasFlurlyLink(blocksData.blocks)
  return (
    <>
      {hasFlurly && (
        <Head>
          <script async src="https://js.stripe.com/v3/"></script>
          <script async src="https://flurly.com/flurly-checkout.js"></script>
        </Head>
      )}
      <ResumeWebsite userBlocksData={blocksData} />
    </>
  )
}

export default ResumePreview
