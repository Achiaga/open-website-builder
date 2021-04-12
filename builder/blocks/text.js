import { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  editBlockConfig,
  getIsMobileBuilder,
  getSelectedBlockId,
} from '../../features/builderSlice'
import { BlocksContext } from '../web-preview/preview'
import { GRID_COLUMNS, STANDARD_MOBILE_SIZE } from '../web-builder/constants'

export const GenericText = (props) => {
  const { text: rawText, parentBlockId, ...data } = props
  const dispatch = useDispatch()
  const selectedId = useSelector(getSelectedBlockId)
  const isMobileBuilder = useSelector(getIsMobileBuilder)

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
  const fontSize =
    parseInt(props.fontSize) * (STANDARD_MOBILE_SIZE / GRID_COLUMNS) * 0.5

  return (
    <Text
      as="span"
      onDoubleClick={handleDoubleClick}
      cursor="pointer"
      w="100%"
      h="100%"
      d="grid"
      onKeyUp={handleKeyUp}
      contentEditable={selectedId === parentBlockId && !isMobileBuilder}
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

function cleanRedirect(url) {
  var prefix = 'https://'
  var prefix2 = 'http://'
  if (url.substr(0, prefix2.length) === prefix2) {
    return url.replace(prefix2, prefix)
  }
  if (url.substr(0, prefix.length) !== prefix) {
    return prefix + url
  }
}

const RedirectWrapper = ({ redirectUrl, children }) => {
  if (!redirectUrl) return children
  const workingRedirectUrl = cleanRedirect(redirectUrl)
  return (
    <a href={workingRedirectUrl} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

export const PrevText = (props) => {
  const { rowHeight } = useContext(BlocksContext)
  const redirectUrl = props?.redirect
  const Textmodifiers = {
    textAlign: props.textAlign,
    backgroundColor: props.backgroundColor,
    color: props.fontColor,
    alignItems: props.alignItems,
    fontWeight: props.fontWeight,
    textShadow: props.textShadow,
    borderRadius: props.borderRadius,
  }
  const fontSize = Math.round(parseInt(props.fontSize) * rowHeight * 0.13)
  const mobileFontSize = fontSize * 2

  return (
    <RedirectWrapper redirectUrl={redirectUrl}>
      <Text
        w="100%"
        h="100%"
        d={'grid'}
        {...Textmodifiers}
        fontSize={[mobileFontSize, mobileFontSize, fontSize]}
        wordBreak="break-word"
      >
        {props.text}
      </Text>
    </RedirectWrapper>
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
