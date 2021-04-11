import Button from '../commun/button'
import { Text } from '@chakra-ui/react'

const NavButton = ({ display, content, id, onClick, ...props }) => {
  return (
    <Button
      id={id}
      fontWeight="500"
      background="transparent"
      border="none"
      onClick={onClick}
      display={display}
      borderBottom="1px solid transparent"
      borderRadius="0"
      px="0.2rem"
      mx="0.8rem"
      _hover={{ borderBottom: '2px solid', borderColor: 'primary.100' }}
      {...props}
    >
      <Text {...props}>{content}</Text>
    </Button>
  )
}

export default NavButton
