import { Button } from '@chakra-ui/button'

const ButtonComponent = ({ children, ...props }) => {
  return (
    <Button
      fontWeight="bold"
      color="white"
      bg="primary.500"
      borderRadius="5px"
      _hover={{ bg: 'primary.500' }}
      _active={{
        bg: 'primary.500',
        transform: 'scale(0.98)',
        borderColor: '#bec3c9',
      }}
      _focus={{
        boxShadow:
          '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default ButtonComponent
