import { useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useDispatch } from 'react-redux'

import { loadInitialData } from '../features/builderSlice'
import { Builder } from '../builder'

const BuilderPage = () => {
  const { user, isLoading } = useUser()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(user, isLoading)
    !isLoading && dispatch(loadInitialData(user))
  }, [isLoading])

  return <Builder />
}

export default BuilderPage
