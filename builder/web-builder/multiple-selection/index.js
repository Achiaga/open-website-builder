import Selector from 'react-selecto'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getGroupSelectedBlocksIds,
  getIsGroupSelectable,
  setGroupSelectedBlocksIds,
  setIsGroupSelectable,
} from '../../../features/builderSlice'

const MultipleSelection = () => {
  const dispatch = useDispatch()

  const [selectedBlocks, setSelectedBlocks] = useState([])
  const [isContinueSelectActive, setIsContinueSelectActive] = useState(false)

  const isGroupSelectable = useSelector(getIsGroupSelectable)
  const selectedBlocksIds = useSelector(getGroupSelectedBlocksIds)

  function handleKeyDown(e) {
    if (e.keyCode === 91) {
      dispatch(setIsGroupSelectable(true))
    }
    if (e.keyCode === 16) {
      setIsContinueSelectActive(true)
    }
  }
  function handleKeyUp(e) {
    if (e.keyCode === 91) {
      dispatch(setIsGroupSelectable(false))
    }
    if (e.keyCode === 16) {
      setIsContinueSelectActive(false)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
  useEffect(() => {
    const ids = selectedBlocks.map(
      (block) => block?.querySelector('.selectable-block')?.id
    )
    dispatch(setGroupSelectedBlocksIds(ids))
  }, [selectedBlocks])

  if (
    !isGroupSelectable &&
    !isContinueSelectActive &&
    selectedBlocksIds?.length > 0
  ) {
    return null
  }

  return (
    <Selector
      dragContainer={'.elements'}
      selectableTargets={['.selecto-area .cube']}
      hitRate={70}
      selectFromInside={isGroupSelectable}
      selectByClick={!isGroupSelectable}
      toggleContinueSelect={['shift']}
      onSelect={(e) => {
        e.added.forEach((el) => {
          el.classList.add('selected')
        })
        e.removed.forEach((el) => {
          el.classList.remove('selected')
        })
      }}
      onSelectEnd={(e) => setSelectedBlocks(e.selected)}
    />
  )
}

export default MultipleSelection
