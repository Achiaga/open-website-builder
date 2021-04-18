import { Box } from '@chakra-ui/layout'
import { RedirectWrapper } from './text'

export const PrevInception = (props) => {
  const redirectUrl = props?.redirect
  const inceptionModifiers = {
    backgroundColor: props.backgroundColor,
    boxShadow: props.boxShadow,
  }
  return (
    <RedirectWrapper redirectUrl={redirectUrl}>
      <Box
        w="100%"
        h="100%"
        backgroundImage={`url(${props.imageUrl})`}
        backgroundPosition="50% 50%"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        margin="auto"
        {...inceptionModifiers}
      ></Box>
    </RedirectWrapper>
  )
}
