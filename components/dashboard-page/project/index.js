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
          justifyContent="space-between"
        >
          <Text as="h2" fontSize="1.35rem" fontWeight="400">
            Projects
          </Text>
          {isPro && (
            <Link href="/templates" passHref>
              <a>
                <Button colorScheme="primary" my="2rem">
                  Create New Project
                </Button>
              </a>
            </Link>
          )}
        </Box>
        <ProjectsCards userProjects={userProjects} />
      </Box>
    </Box>
  )
}

export default Projects
