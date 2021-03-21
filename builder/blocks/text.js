import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Text } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { editBlockConfig } from '../../features/builderSlice'

export const GenericText = (props) => {
  const { text: rawText, parentBlockId, ...data } = props
  const dispatch = useDispatch()

  const Textmodifiers = {
    fontSize: props.fontSize,
    textAlign: props.textAlign,
    backgroundColor: props.backgroundColor,
    color: props.fontColor,
    alignItems: props.alignItems,
    fontWeight: props.fontWeight,
    boxShadow: props.boxShadow,
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

  function handleKeyUp(e) {
    e.stopPropagation()
    const value = titleRef.current?.innerText
    const updatedBlock = { ...data, text: value }
    dispatch(editBlockConfig({ newData: updatedBlock, blockId: parentBlockId }))
  }

  return (
    <Text
      cursor="pointer"
      w="100%"
      h="100%"
      d="grid"
      onClick={(e) => e.stopPropagation()}
      onKeyUp={handleKeyUp}
      contentEditable={true}
      suppressContentEditableWarning
      {...Textmodifiers}
      wordBreak="break-word"
      ref={titleRef}
    >
      {text}
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
  boxShadow: PropTypes.string,
  borderRadius: PropTypes.string,
  bg: PropTypes.string,
  onKeyUp: PropTypes.func,
}

export default GenericText
