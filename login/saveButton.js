import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBuilderData,
  setSaveStatus,
  getSaveStatus,
} from '../features/builderSlice'
import { saveData } from './helpers'
import { IoCheckmark } from 'react-icons/io5'

import Card from './card'
import { Spinner } from '@chakra-ui/spinner'
import { Box } from '@chakra-ui/layout'

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
      <Card
        onClick={handleSavePage}
        fontSize="md"
        active={true}
        w="100px"
        d="flex"
        alignItems="center"
      >
        <Spinner color="green.500" thickness="3px" />
      </Card>
    )

  return (
    <Card
      onClick={handleSavePage}
      fontSize="md"
      alignItems="center"
      {...(isSaved && { backgroundColor: 'primary.500', color: 'white' })}
      _hover={
        isSaved
          ? {
              backgroundColor: 'primary.700',
              color: 'white',
            }
          : { backgroundColor: 'white' }
      }
      w="100px"
    >
      {isSaved ? (
        <Box d="flex">
          <IoCheckmark size="20px" />
          Saved{' '}
        </Box>
      ) : (
        'Save'
      )}
    </Card>
  )
}

export default SaveButton
