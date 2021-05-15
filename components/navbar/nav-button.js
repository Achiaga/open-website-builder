import { Button, Text } from '@chakra-ui/react'
import Link from 'next/link'

const NavButton = ({
  display,
  content,
  id,
  color,
  onClick = () => {},
  redirect,
  ...props
}) => {
  return (
    <Link href={redirect}>
      <a>
        <Button
          id={id}
          fontWeight="500"
          background="transparent"
          border="none"
          onClick={onClick}
          display={display}
          borderBottom="2px solid transparent"
          borderRadius="0"
          px="0.2rem"
          mx="0.8rem"
          _hover={{
            borderBottom: '2px solid',
            borderColor: color || 'gray.500',
          }}
        >
          <Text {...props}>{content}</Text>
        </Button>
      </a>
    </Link>
  )
}

export default NavButton
