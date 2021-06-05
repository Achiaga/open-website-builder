import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from '@chakra-ui/react'
import { batch, useDispatch, useSelector } from 'react-redux'
import {
  editBlockConfig,
  getSelectedBlockId,
  handleResizeTextBlock,
} from '../../features/builderSlice'
import Editor from './editor'

export const GenericText = (props) => {
  const { parentBlockId, ...data } = props
  const dispatch = useDispatch()
  const selectedId = useSelector(getSelectedBlockId)

  const titleRef = useRef(null)

  function handleKeyUp(value) {
    const dim = titleRef.current?.getBoundingClientRect()
    const updatedBlock = { ...data, text: value }
    batch(() => {
      dispatch(
        editBlockConfig({ newData: updatedBlock, blockId: parentBlockId })
      )
      dispatch(handleResizeTextBlock(dim, parentBlockId))
    })
  }

  return (
    <Box ref={titleRef} cursor="pointer">
      <Editor
        data={props}
        blockId={props.parentBlockId}
        handleChange={handleKeyUp}
        selectedId={selectedId}
      />
    </Box>
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
  return url
}

export const RedirectWrapper = ({ redirectUrl, children }) => {
  if (!redirectUrl) return children
  const workingRedirectUrl = cleanRedirect(redirectUrl)
  if (redirectUrl.includes('gumroad')) {
    return (
      <a href={workingRedirectUrl} style={{ display: 'flex', height: '100%' }}>
        {children}
      </a>
    )
  }
  return (
    <a
      href={workingRedirectUrl}
      target="_blank"
      rel="noreferrer"
      style={{ display: 'flex', height: '100%' }}
    >
      {children}
    </a>
  )
}

const Styles = ({ children }) => {
  return (
    <Box
      boxSizing="border-box"
      lineHeight="1.42"
      height="100%"
      outline="none"
      overflow-y="auto"
      padding="0px"
      tabSize="4"
      textAlign="left"
      whiteSpace="pre-wrap"
      bg="transparent"
      w="100%"
      sx={{
        blockquote: {
          borderLeft: '4px solid #ccc',
          marginBottom: '5px',
          marginTop: '5px',
          paddingLeft: '16px',
        },
        h1: {
          fontSize: '6em',
        },
        h2: {
          fontSize: '4em',
        },
        h3: {
          fontSize: '3em',
        },
        h4: {
          fontSize: '2em',
        },
        h5: {
          fontSize: '1.5em',
        },
        h6: {
          fontSize: '1.2em',
        },
        '.ql-align-center': {
          textAlign: 'center',
        },
        '.ql-align-justify': {
          textAlign: 'justify',
        },
        '.ql-align-right': {
          textAlign: 'right',
        },
      }}
    >
      {children}
    </Box>
  )
}

export const PrevText = (props) => {
  const redirectUrl = props?.redirect

  function createMarkup() {
    return { __html: props.text }
  }
  return (
    <RedirectWrapper redirectUrl={redirectUrl}>
      <div
        className="textStyles"
        style={{
          boxSizing: 'border-box',
          lineHeight: '1.42',
          height: '100%',
          outline: 'none',
          padding: '0px',
          tabSize: '4',
          textAlign: 'left',
          backgroundColor: 'transparent',
          width: '100%',
        }}
      >
        <span
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            wordBreak: 'break-word',
            color: 'gray.500',
          }}
          dangerouslySetInnerHTML={createMarkup()}
        />
      </div>
    </RedirectWrapper>
  )
}
export const BuilderPrevText = ({ data }) => {
  function createMarkup() {
    return { __html: data.text }
  }

  return (
    <Styles>
      <Text
        w="100%"
        h="100%"
        wordBreak="break-word"
        dangerouslySetInnerHTML={createMarkup()}
      />
    </Styles>
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
