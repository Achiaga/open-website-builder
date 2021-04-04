import { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  editBlockConfig,
  getGridRowHeight,
  getSelectedBlockId,
} from '../../features/builderSlice'
import { BlocksContext } from '../web-preview/preview'

export const GenericText = (props) => {
  const { text: rawText, parentBlockId, ...data } = props
  const dispatch = useDispatch()
  const selectedId = useSelector(getSelectedBlockId)
  const gridRowHeight = useSelector(getGridRowHeight)

  const Textmodifiers = {
    textAlign: props.textAlign,
    backgroundColor: props.backgroundColor,
    color: props.fontColor,
    alignItems: props.alignItems,
    fontWeight: props.fontWeight,
    textShadow: props.textShadow,
    borderRadius: props.borderRadius,
  }
  const [text] = useState(rawText)
  const titleRef = useRef(null)

  useEffect(() => {
    titleRef?.current?.addEventListener('paste', function (e) {
      e.preventDefault()
      var text = e.clipboardData.getData('text/plain')
      document.execCommand('insertText', false, text)
    })
  }, [titleRef])

  function handleDoubleClick() {
    titleRef.current?.blur()
    titleRef.current?.focus()
    document.execCommand('selectAll', false, null)
  }

  useEffect(() => {
    titleRef.current.textContent = rawText
  }, [rawText])

  function handleKeyUp(e) {
    e.stopPropagation()
    const value = titleRef.current?.innerText
    const updatedBlock = { ...data, text: value }
    dispatch(editBlockConfig({ newData: updatedBlock, blockId: parentBlockId }))
  }
  const fontSize = parseInt(props.fontSize) * (375 / 200) * 2 * 3

  return (
    <Text
      as="span"
      onDoubleClick={handleDoubleClick}
      cursor="pointer"
      w="100%"
      h="100%"
      d="grid"
      onKeyUp={handleKeyUp}
      contentEditable={selectedId === parentBlockId}
      suppressContentEditableWarning
      {...Textmodifiers}
      fontSize={fontSize}
      wordBreak="break-word"
      ref={titleRef}
      outline="none"
    >
      {text}
    </Text>
  )
}

export const PrevText = (props) => {
  // we need to activate this for the mobile responsive
  const { rowHeight } = useContext(BlocksContext)
  const Textmodifiers = {
    textAlign: props.textAlign,
    backgroundColor: props.backgroundColor,
    color: props.fontColor,
    alignItems: props.alignItems,
    fontWeight: props.fontWeight,
    textShadow: props.textShadow,
    borderRadius: props.borderRadius,
  }
  const fontSize = parseInt(props.fontSize) * rowHeight * 2
  return (
    <Text
      w="100%"
      h="100%"
      d="grid"
      {...Textmodifiers}
      fontSize={fontSize}
      wordBreak="break-word"
    >
      {props.text}
    </Text>
  )
}

GenericText.displayName = 'TextBlock'

GenericText.propTypes = {
  parentBlockId: PropTypes.string,
  isEditable: PropTypes.bool,
  contentEditable: PropTypes.bool,
  text: PropTypes.string,
  fontSize: PropTypes.string,
  textAlign: PropTypes.string,
  fontColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  alignItems: PropTypes.string,
  fontWeight: PropTypes.string,
  textShadow: PropTypes.string,
  borderRadius: PropTypes.string,
  bg: PropTypes.string,
  onKeyUp: PropTypes.func,
}
PrevText.propTypes = {
  text: PropTypes.string,
  fontSize: PropTypes.string,
  textAlign: PropTypes.string,
  fontColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  alignItems: PropTypes.string,
  fontWeight: PropTypes.string,
  textShadow: PropTypes.string,
  borderRadius: PropTypes.string,
  bg: PropTypes.string,
}

export default GenericText
