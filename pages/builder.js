import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { loadInitialData } from '../features/builderSlice'
import { Builder } from '../builder'

const BuilderPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadInitialData())
  }, [])

  return <Builder />
}

export default BuilderPage
