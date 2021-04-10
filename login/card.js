import { Button } from '@chakra-ui/button'

const Card = ({ children, ...props }) => {
  return (
    <Button
      d="flex"
      w="fit-content"
      flexDir="column"
      justifyContent="center"
      alignItems="flex-start"
      boxShadow="0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)"
      border="1px solid transparent"
      borderRadius="10px"
      backgroundColor={props.backgroundColor || '#ffffff42'}
      cursor="pointer"
      mb="0.5rem"
      pos="relative"
      width="4.3rem"
      minW="4.3rem"
      _hover={{
        bg: 'white',
        border: '1px solid black',
      }}
      {...(props.active && { backgroundColor: 'white' })}
      {...props}
    >
      {children}
    </Button>
  )
}

export default Card
