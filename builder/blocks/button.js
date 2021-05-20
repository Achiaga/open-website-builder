import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editBlockConfig } from '../../features/builderSlice'
import getColorShades, { getIsColorBright } from './block-helpers/color-shades'
import { RedirectWrapper } from './text'

function getBackgroundColor(color) {
  if (!color) return '#000000'
  if (color === 'transparent') return '#ffffff00'
  return color
}

export const CustonButton = ({ children, ...props }) => {
  const backgroundColor = getBackgroundColor(props?.backgroundColor)
  const gradient = props.gradientColor || []
  const shades = getColorShades(backgroundColor)
  const isColorBright = getIsColorBright(backgroundColor)
  const fontColor = isColorBright ? 'gray.500' : 'white'

  return (
    <div
      className="textStyles"
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <button
        style={{
          width: '100%',
          height: '100%',
          boxShadow: props.boxShadow,
          border: props.border,
          borderRadius: props.borderRadius,
          background: !gradient[1]
            ? backgroundColor
            : `linear-gradient(225deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
          color: fontColor,
          overflow: 'hidden',
          cursor: 'pointer',
          padding: '0px 1rem',
        }}
        // _hover={{
        //   backgroundColor: shades.colors[isColorBright ? '600' : '400'],
        //   boxShadow: props.boxShadow,
        // }}
        // _active={{
        //   backgroundColor: shades.colors[isColorBright ? '700' : '300'],
        //   boxShadow: props.boxShadow,
        // }}
      >
        {children}
      </button>
    </div>
  )
}

export const ButtonGeneric = (props) => {
  const dispatch = useDispatch()
  const [textInput, setTextInput] = useState(props.text || 'button')
  const redirectUrl = props?.redirect

  const { borderRadius, border, boxShadow, backgroundColor, gradientColor } =
    props

  function handleChange(e) {
    setTextInput(e.target.value)
  }
  useEffect(() => {
    const updatedBlock = { ...props, text: textInput }
    dispatch(
      editBlockConfig({ newData: updatedBlock, blockId: props.parentBlockId })
    )
  }, [textInput])

  return (
    <RedirectWrapper redirectUrl={redirectUrl}>
      <CustonButton
        borderRadius={borderRadius}
        border={border}
        backgroundColor={backgroundColor}
        gradientColor={gradientColor}
        boxShadow={boxShadow}
      >
        <Input
          p="0"
          onChange={handleChange}
          value={textInput || ''}
          w="100%"
          border="none"
          textAlign="center"
        />
      </CustonButton>
    </RedirectWrapper>
  )
}

export const PreviewButton = (props) => {
  const redirectUrl = props?.redirect
  const {
    borderRadius,
    border,
    boxShadow,
    backgroundColor,
    gradientColor,
    text,
  } = props

  return (
    <RedirectWrapper redirectUrl={redirectUrl}>
      <CustonButton
        borderRadius={borderRadius}
        border={border}
        backgroundColor={backgroundColor}
        gradientColor={gradientColor}
        boxShadow={boxShadow}
      >
        {text || ''}
      </CustonButton>
    </RedirectWrapper>
  )
}
