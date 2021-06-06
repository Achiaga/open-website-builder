import { Input } from '@chakra-ui/input'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editBlockConfig } from '../../features/builderSlice'
import { RedirectWrapper } from './text'
import GumroadIcon from '../../assets/gumroad-button'

const GumroadButton = ({ type }) => {
  const isGumroadButton = type === 'gumroad'
  if (!isGumroadButton) {
    return null
  }
  return <GumroadIcon />
}

export const CustomButton = ({ children, ...props }) => {
  const gradient = props.gradientColor || []

  const fontColor = props.color

  return (
    <div
      className={`textStyles`}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <button
        style={{
          fontSize: 'inherit',
          width: '100%',
          height: '100%',
          boxShadow: props.boxShadow,
          border: props.border,
          borderRadius: props.borderRadius,
          background: !gradient[1]
            ? props.backgroundColor
            : `linear-gradient(225deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
          color: fontColor,
          overflow: 'hidden',
          cursor: 'pointer',
          padding: '0px 1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <GumroadButton type={props.subType} />
        <div style={{ flex: 1 }}>{children}</div>
      </button>
    </div>
  )
}

export const ButtonGeneric = (props) => {
  const dispatch = useDispatch()
  const [textInput, setTextInput] = useState(props.text || 'button')

  const {
    borderRadius,
    border,
    boxShadow,
    backgroundColor,
    gradientColor,
    fontColor,
    subType,
  } = props

  function handleChange(e) {
    setTextInput(e.target.value)
  }
  useEffect(() => {
    const updatedBlock = { ...props, text: textInput }
    delete updatedBlock.parentBlockId
    dispatch(
      editBlockConfig({ newData: updatedBlock, blockId: props.parentBlockId })
    )
  }, [textInput])

  return (
    <CustomButton
      borderRadius={borderRadius}
      border={border}
      backgroundColor={backgroundColor}
      gradientColor={gradientColor}
      boxShadow={boxShadow}
      color={fontColor}
      subType={subType}
    >
      <Input
        fontSize="inherit"
        p="0"
        onChange={handleChange}
        value={textInput || ''}
        w="100%"
        border="none"
        textAlign="center"
      />
    </CustomButton>
  )
}

export const PreviewButton = (props) => {
  const redirectUrl = props?.redirect
  const {
    borderRadius,
    border,
    backgroundColor,
    gradientColor,
    text,
    fontColor,
    subType,
  } = props
  return (
    <RedirectWrapper redirectUrl={redirectUrl}>
      <CustomButton
        borderRadius={borderRadius}
        border={border}
        backgroundColor={backgroundColor}
        gradientColor={gradientColor}
        color={fontColor}
        subType={subType}
      >
        {text || ''}
      </CustomButton>
    </RedirectWrapper>
  )
}
