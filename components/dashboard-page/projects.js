import Link from 'next/link'
import { Box, Text, Button, Spinner } from '@chakra-ui/react'
import { removeProject } from '../../features/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProjects } from '../../features/userSlice'
import { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'

const ProjectCard = ({ project }) => {
  const { user } = useUser()
  const [isRemoving, setIsRemoving] = useState(false)
  const dispatch = useDispatch()
  function handleRemoveProject() {
    setIsRemoving(true)
    dispatch(removeProject(project._id, user.sub))
  }
  return (
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
      <Text as="p">{project._id}</Text>
      <Box>
        <Link href="/builder" passHref>
          <a>
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
          </a>
        </Link>
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
          onClick={handleRemoveProject}
        >
          {isRemoving ? <Spinner color="red" /> : 'Delete'}
        </Button>
      </Box>
    </Box>
  )
}

const Projects = ({ user }) => {
  const userProjects = useSelector(getUserProjects)
  return (
    <Box marginLeft="7rem" marginTop="5rem" width="60%">
      <Text as="h1" fontSize="2.3rem" fontWeight="400" fontFamily="Montserrat">
        Welcome{' '}
        <Text as="span" fontWeight="500" pl="0.5rem">
          {user.nickname}
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
        <Box mt="1rem" mb="1rem">
          {userProjects?.length ? (
            userProjects?.map((website) => {
              return <ProjectCard project={website} key={website._id} />
            })
          ) : (
            <Link href="/templates" passHref>
              <a>
                <Button marginRight="1rem" colorScheme="primary">
                  Create New Project
                </Button>
              </a>
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Projects
