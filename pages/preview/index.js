import { useEffect, useState } from 'react'
import { ResumeWebsite } from '../../builder/web-preview/preview'
import { getUserDataFromLS } from '../../features/helper'

function ResumePreview() {
  const [blocksData, setBlocksData] = useState(null)

  async function loadData() {
    const blocksData = await getUserDataFromLS()
    setBlocksData(blocksData)
  }
  useEffect(() => {
    loadData()
  }, [])

  if (!blocksData) return <div>loading</div>

  return <ResumeWebsite userBlocksData={blocksData} />
}

export default ResumePreview
