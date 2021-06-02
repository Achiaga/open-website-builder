import { useState } from 'react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Text, Button, Spinner, Tag } from '@chakra-ui/react'
import { BsFillCaretUpFill, BsCaretDownFill } from 'react-icons/bs'

import { removeProject } from '../../../features/userSlice'
import { getUserProjects } from '../../../features/userSlice'
import DomainsWrapper from './domains'
import SubdomainWrapper from './subdomain'
import { getIsUserAdmin } from '../../../features/login-helpers'

const ProjectCard = ({ project, defaultOpen = false }) => {
  const { user } = useUser()
  const [isRemoving, setIsRemoving] = useState(false)
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const dispatch = useDispatch()
  function handleRemoveProject() {
    setIsRemoving(true)
    dispatch(removeProject(project._id, user.sub))
  }

  const isPublished = project.publish
  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="flex-start"
      background="white"
      boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
      height="5rem"
      borderRadius="5px"
      h="100%"
      my="1rem"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        padding="1rem"
        pl="2rem"
        borderBottom="1px solid"
        borderColor={isOpen ? 'gray.200' : 'transparent'}
      >
        <Text as="p">{project._id}</Text>
        {isPublished ? (
          <Tag
            size={'sm'}
            borderRadius="full"
            variant="solid"
            colorScheme="green"
            fontSize="sm"
          >
            Published
          </Tag>
        ) : (
          <Tag
            size={'sm'}
            borderRadius="full"
            variant="solid"
            colorScheme="gray"
          >
            No Published
          </Tag>
        )}
        <Box mx="1rem" cursor="pointer">
          {isOpen ? (
            <BsFillCaretUpFill onClick={() => setIsOpen(false)} />
          ) : (
            <BsCaretDownFill onClick={() => setIsOpen(true)} />
          )}
        </Box>
      </Box>
      {isOpen && (
        <Box width="100%" p="0.5rem" pl="2rem">
          <Box width="100%" mt="0.5rem">
            <SubdomainWrapper
              projectId={project._id}
              actualSubdomain={project.subdomain}
            />
          </Box>
          <Box width="100%" mt="0.5rem">
            <DomainsWrapper domain={project.domain} projectId={project._id} />
          </Box>
          <Box d="flex" justifyContent="flex-end" pb="1rem">
            <Button
              marginRight="1rem"
              w="100px"
              variant="outline"
              colorScheme="gray"
              onClick={handleRemoveProject}
            >
              {isRemoving ? <Spinner color="red" /> : 'Delete'}
            </Button>
            <Link href={`/builder?project=${project._id}`} passHref>
              <a>
                <Button
                  w="100px"
                  marginRight="1rem"
                  borderColor="primary.700"
                  colorScheme="primary"
                >
                  Edit
                </Button>
              </a>
            </Link>
          </Box>
        </Box>
      )}
    </Box>
  )
}

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
  const isAdmin = getIsUserAdmin(user)
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
        <Box
          d="flex"
          alignItems="center"
          mt="1.5rem"
          justifyContent="space-between"
        >
          <Text as="h2" fontSize="1.35rem" fontWeight="400">
            Projects
          </Text>
          {isAdmin && (
            <Link href="/templates" passHref>
              <a>
                <Button marginRight="1rem" colorScheme="primary" my="2rem">
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
