import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getSaveStatus, saveWebsite } from '../features/builderSlice'
import { IoCheckmark } from 'react-icons/io5'

import Card from './card'
import { Spinner } from '@chakra-ui/spinner'
import { Box } from '@chakra-ui/layout'

const SaveButton = () => {
  const dispatch = useDispatch()
  const saveStatus = useSelector(getSaveStatus)

  const { user } = useUser()
  const router = useRouter()

  async function handleSavePage() {
    if (user) {
      dispatch(saveWebsite(user))
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
        w="4.3rem"
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
          : { backgroundColor: 'white', border: '1px solid black' }
      }
      w="4.3rem"
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
