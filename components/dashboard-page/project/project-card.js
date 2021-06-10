import { useState } from 'react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Text, Button, Spinner, Tag } from '@chakra-ui/react'
import { BsFillCaretUpFill, BsCaretDownFill } from 'react-icons/bs'

import { removeProject } from '../../../features/userSlice'
import DomainsWrapper from './domains'
import SubdomainWrapper from './subdomain'

import { getIsUserPro } from '../../../features/builderSlice'

const ProjectCard = ({ project, defaultOpen = false }) => {
  const { user } = useUser()
  const [isRemoving, setIsRemoving] = useState(false)
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const isPro = useSelector(getIsUserPro)

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
          {isPro && (
            <Box width="100%" mt="0.5rem">
              <DomainsWrapper domain={project.domain} projectId={project._id} />
            </Box>
          )}
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

export default ProjectCard
