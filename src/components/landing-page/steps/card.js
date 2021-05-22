import { Box, Text } from '@chakra-ui/layout'

const Card = ({ step, title, body, subbody }) => {
  return (
    <Box w="100%" d="flex" justifyContent="center">
      <Box
        w={['300px', '250px', '300px', '350px']}
        h={['380px', '400px', '440px']}
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="center"
        bg="white"
        borderRadius="20px"
        border={['2px solid']}
        borderColor={['gray.200', 'transparent']}
        padding="1.5rem"
        mb={['4rem', 0]}
        boxShadow={['0', '3px 3px 10px 3px rgba(56,28,100,0.1)']}
      >
        <Text as="h1" fontSize={['20px', '36px']} fontWeight="400">
          {step}
        </Text>
        <Text
          as="h3"
          fontSize={['24px', '20px', '24px']}
          color="primary.500"
          fontWeight="700"
          paddingBottom="1rem"
        >
          {title}
        </Text>
        <Text as="p" fontSize={['16px', '14px', '20px']} fontWeight="400">
          {body}
        </Text>
        {subbody && (
          <Text
            as="p"
            fontSize="12px"
            color="gray.600"
            fontWeight="400"
            paddingTop="1.5rem"
            paddingBottom="2rem"
          >
            {subbody}
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default Card
