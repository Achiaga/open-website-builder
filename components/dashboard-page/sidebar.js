import Link from 'next/link'
import { Box, Text, Button } from '@chakra-ui/react'

import LogoSvg from '../../assets/logo'
import { RiDashboardLine } from 'react-icons/ri'

const ButtonSidebar = ({ children, ...props }) => {
  return (
    <Button
      w="full"
      mt="1rem"
      display="flex"
      justifyContent="start"
      background="none"
      borderLeft="2px solid transparent"
      borderRadius="0"
      borderTopRightRadius="3px"
      borderBottomRightRadius="3px"
      paddingY="1.25rem"
      paddingLeft="0.75rem"
      height="2rem"
      fontFamily="Montserrat"
      fontWeight="400"
      marginY="0.25rem"
      _hover={{
        borderRadius: '3px',
        background: 'primary.200',
      }}
      _active={{
        borderColor: 'primary.500',
        background: 'primary.100',
        fontWeight: '600',
      }}
      _focus={{}}
      {...props}
    >
      {children}
    </Button>
  )
}

const Sidebar = ({ dashboardType = 'projects' }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      py="2rem"
      height="full"
      minHeight="100vh"
      width="25%"
      borderRight="1px solid gray"
      borderColor="gray.100"
      bg="white"
    >
      <Box
        w="full"
        px="2.5rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingBottom="1.5rem"
        borderBottom="1px solid gray"
        borderColor="gray.50"
      >
        <Link href="/">
          <Button bg="transparent" _hover={{ bg: 'trasnparent' }}>
            <LogoSvg width="2.5rem" />
          </Button>
        </Link>
        <Text
          as="h1"
          pl="1rem"
          fontWeight="600"
          fontSize="1.25rem"
          fontFamily="Montserrat"
        >
          Antfolio
        </Text>
      </Box>
      <Box w="full" px="1rem" pt="0.5rem">
        <Link href="/dashboard/projects">
          <ButtonSidebar id="projects" isActive={dashboardType === 'projects'}>
            <RiDashboardLine fontSize="1rem" />
            <Text as="h4" fontSize="1rem" pl="0.75em">
              Projects
            </Text>
          </ButtonSidebar>
        </Link>
        {/* <Link href="/dashboard/settings">
          <ButtonSidebar id="settings" isActive={dashboardType === 'settings'}>
            <GrUserSettings fontSize="1rem" />
            <Text as="h4" fontSize="1rem" pl="0.75rem">
              Settings
            </Text>
          </ButtonSidebar>
        </Link> */}
      </Box>
    </Box>
  )
}

export default Sidebar
