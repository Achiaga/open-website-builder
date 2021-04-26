import { Button } from '@chakra-ui/button'
import { RedirectWrapper } from './text'

export const ButtonGeneric = (props) => {
  const redirectUrl = props?.redirect

  return (
    <RedirectWrapper redirectUrl={redirectUrl}>
      <Button
        as="span"
        w="100%"
        h="100%"
        borderRadius="1%"
        colorScheme="primary"
      >
        {props.text || 'Button'}
      </Button>
    </RedirectWrapper>
  )
}
