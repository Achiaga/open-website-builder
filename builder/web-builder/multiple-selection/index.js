import Selector from 'react-selecto'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getIsGroupSelectable,
  setGroupSelectedBlocksIds,
  setIsGroupSelectable,
} from '../../../features/builderSlice'

const MultipleSelection = () => {
  const dispatch = useDispatch()

  const [selectedBlocks, setSelectedBlocks] = useState([])

  const isGroupSelectable = useSelector(getIsGroupSelectable)

  function handleKeyDown(e) {
    if (e.keyCode === 91) {
      dispatch(setIsGroupSelectable(true))
    }
  }
  function handleKeyUp(e) {
    if (e.keyCode === 91) {
      dispatch(setIsGroupSelectable(false))
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

  if (!isGroupSelectable) return null

  return (
    <Selector
      dragContainer={'.elements'}
      selectableTargets={['.selecto-area .cube']}
      hitRate={40}
      selectFromInside={true}
      toggleContinueSelect={'shift'}
      onSelect={(e) => {
        e.added.forEach((el) => {
          el.classList.add('selected')
        })
        e.removed.forEach((el) => {
          el.classList.remove('selected')
        })
      }}
      onSelectEnd={(e) => {
        setSelectedBlocks(e.selected)
      }}
    />
  )
}

export default MultipleSelection
