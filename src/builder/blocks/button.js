import { Input } from '@chakra-ui/input'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editBlockConfig } from '../../features/builderSlice'
import { CustomButton } from '../../preview/blocks/button'
import { RedirectWrapper } from './text'

export const ButtonGeneric = (props) => {
  const dispatch = useDispatch()
  const [textInput, setTextInput] = useState(props.text || 'button')
  const redirectUrl = props?.redirect
  const { borderRadius, border, boxShadow, backgroundColor } = props

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
      <CustomButton
        borderRadius={borderRadius}
        border={border}
        backgroundColor={backgroundColor}
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
      </CustomButton>
    </RedirectWrapper>
  )
}
