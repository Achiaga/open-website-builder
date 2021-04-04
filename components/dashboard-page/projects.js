import { Box, Text, Button, background } from '@chakra-ui/react'

const Projects = () => {
  return (
    <Box marginLeft="7rem" marginTop="5rem">
      <Text as="h1" fontSize="2.3rem" fontWeight="400" fontFamily="Montserrat">
        Welcome{' '}
        <Text as="span" fontWeight="500" pl="0.5rem">
          first_user@gmail.com
        </Text>
        !
      </Text>
      <Box width="full" mb="1.25rem">
        <Text
          as="h2"
          mt="3rem"
          fontSize="1.35rem"
          fontWeight="400"
          fontFamily="Montserrat"
        >
          Projects
        </Text>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        background="white"
        boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
        height="5rem"
        borderRadius="5px"
        padding="1rem"
      >
        <Text as="p">Project 1</Text>
        <Box>
          <Button
            marginRight="1rem"
            variant="outline"
            borderColor="primary.700"
            color="primary.700"
            _hover={{
              background: 'primary.700',
              color: 'white',
            }}
          >
            Edit
          </Button>
          <Button
            marginRight="1rem"
            variant="outline"
            borderColor="black"
            color="black"
            _hover={{
              borderColor: 'red.700',
              background: 'red.700',
              color: 'white',
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Projects
