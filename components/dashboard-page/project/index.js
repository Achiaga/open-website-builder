import Link from 'next/link'
import { useSelector } from 'react-redux'
import { Box, Text, Button, Spinner } from '@chakra-ui/react'

import { getUserProjects } from '../../../features/userSlice'
import { getIsUserRoles } from '../../../features/login-helpers'
import { getIsUserPro } from '../../../features/builderSlice'

import ProjectCard from './project-card'
import Badges from './components/badges'

const ProjectsCards = ({ userProjects }) => {
  if (!userProjects) return <Spinner />
  return (
    <Box mt="1rem" mb="1rem">
      {userProjects?.map((website, index) => {
        return (
          <ProjectCard
            project={website}
            key={website._id}
            defaultOpen={index === 0}
          />
        )
      })}
    </Box>
  )
}

function showCreateProjectButton(isPro, userProjects) {
  return (userProjects && userProjects?.length < 1) || isPro
}

const Projects = ({ user }) => {
  const userProjects = useSelector(getUserProjects)
  const isPro = useSelector(getIsUserPro)

  const roles = getIsUserRoles(user)

  return (
    <Box marginLeft="7rem" marginTop="5rem" width="60%">
      <Text as="h1" fontSize="2.3rem" fontWeight="400" fontFamily="Montserrat">
        Welcome{' '}
        <Text as="span" fontWeight="500" pl="0.5rem">
          {user.nickname}
        </Text>
        !
      </Text>
      <Badges roles={roles} />
      <Box width="full" mb="1.25rem">
        <Box
          d="flex"
          alignItems="center"
          mt="1.5rem"
          mb="3rem"
          justifyContent="space-between"
        >
          <Text as="h2" fontSize="1.35rem" fontWeight="400">
            Projects
          </Text>
          {showCreateProjectButton(isPro, userProjects) ? (
            <Link href="/templates" passHref>
              <a>
                <Button colorScheme="primary" my="2rem">
                  Create New Project
                </Button>
              </a>
            </Link>
          ) : (
            <Box>
              <Box as="span">Create More Projects with </Box>
              <Link href="/pricing" passHref>
                <a>
                  <Button
                    bg="linear-gradient(91.56deg, #43E28E 0%, #506bf0 122.55%)"
                    border="1px solid"
                    borderColor="primary.600"
                    boxShadow="md"
                    color="white"
                    _hover={{
                      filter: 'brightness(1.1)',
                    }}
                  >
                    Antfolio Pro
                  </Button>
                </a>
              </Link>
            </Box>
          )}
        </Box>
        <ProjectsCards userProjects={userProjects} />
      </Box>
    </Box>
  )
}

export default Projects
