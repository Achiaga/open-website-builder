import Selector from 'react-selecto'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setGroupSelectedBlocksIds } from '../../../features/builderSlice'

const MultipleSelection = () => {
  const dispatch = useDispatch()
  const [isSelectable, setIsSelectable] = useState(false)
  const [selectedBlocks, setSelectedBlocks] = useState([])

  function handleKeyDown(e) {
    if (e.keyCode === 91) {
      return setIsSelectable(true)
    } else {
      setIsSelectable(true)
    }
  }
  function handleKeyUp(e) {
    if (e.keyCode === 91) {
      setIsSelectable(false)
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
      (block) => block?.querySelector('.draggHandle')?.id
    )
    dispatch(setGroupSelectedBlocksIds(ids))
  }, [selectedBlocks])

  if (!isSelectable) return null

  return (
    <Selector
      dragContainer={'.elements'}
      selectableTargets={['.selecto-area .cube']}
      hitRate={40}
      selectFromInside={false}
      toggleContinueSelect={'shift'}
      onSelect={(e) => {
        console.log('onSelect', e)
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
