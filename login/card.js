import { Button } from '@chakra-ui/button'

const Card = ({ children, ...props }) => {
  return (
    <Button
      d="flex"
      w="fit-content"
      flexDir="column"
      justifyContent="center"
      alignItems="flex-start"
      boxShadow="0 13px 27px -5px rgba(50,50,93,0.25),0 8px 16px -8px rgba(0,0,0,0.3)"
      border="1px solid transparent"
      borderRadius="10px"
      backgroundColor="#ffffff42"
      cursor="pointer"
      mb="0.5rem"
      pos="relative"
      width="4.35rem"
      _hover={{
        bg: 'white',
        border: '1px solid black',
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default Card
