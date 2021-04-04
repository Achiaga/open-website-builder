import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBuilderData,
  setSaveStatus,
  getSaveStatus,
} from '../features/builderSlice'
import { saveData } from './helpers'

import Card from './card'
import { Spinner } from '@chakra-ui/spinner'

const SaveButton = () => {
  const dispatch = useDispatch()
  const saveStatus = useSelector(getSaveStatus)
  const builderData = useSelector(getBuilderData)

  const { user } = useUser()
  const router = useRouter()

  async function handleSavePage() {
    if (user) {
      dispatch(setSaveStatus('loading'))
      await saveData({ user, builderData })
      dispatch(setSaveStatus('success'))
      return
    }
    return router.push('/api/auth/custom-login')
  }
  const isSaved = saveStatus === 'success'
  if (saveStatus === 'loading')
    return (
      <Card onClick={handleSavePage} fontSize="md">
        <Spinner />
      </Card>
    )

  return (
    <Card
      onClick={handleSavePage}
      fontSize="md"
      {...(isSaved && { backgroundColor: 'green.500' })}
    >
      {isSaved ? 'Saved' : 'Save'}
    </Card>
  )
}

export default SaveButton
