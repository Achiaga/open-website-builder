import { Box, Text } from '@chakra-ui/layout'

const Card = ({ step, title, body, subBody }) => {
  return (
    <Box w="100%" d="flex" justifyContent="center">
      <Box
        w={['80%', '350px', '350px', '280px', '380px']}
        h={['380px', '400px', '440px']}
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="center"
        bg="white"
        borderRadius="20px"
        border={['2px solid']}
        borderColor={['gray.200', 'transparent']}
        padding={['1.5rem', '1.5rem', '1rem', '1.5rem']}
        mb={['4rem', 0]}
        boxShadow={['0', '3px 3px 10px 3px rgba(56,28,100,0.1)']}
      >
        <Text as="h1" fontSize={['20px', '26px']} fontWeight="400">
          {step}
        </Text>
        <Text
          as="h3"
          fontSize={['24px', '28px', '32px']}
          color="primary.500"
          fontWeight="700"
          paddingBottom="1rem"
          textAlign="center"
        >
          {title}
        </Text>
        <Text
          as="p"
          fontSize={['16px', '14px', '18px', '20px']}
          fontWeight="400"
        >
          {body}
        </Text>
        {subBody && (
          <Text
            as="p"
            fontSize="12px"
            color="gray.600"
            fontWeight="400"
            paddingTop="1.5rem"
            paddingBottom="2rem"
          >
            {subBody}
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default Card
