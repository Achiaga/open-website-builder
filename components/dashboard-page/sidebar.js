import { Box, Text, Button } from '@chakra-ui/react'

import LogoSvg from '../../assets/logo'
import { RiDashboardLine } from 'react-icons/ri'
import { GrUserSettings } from 'react-icons/gr'

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
        background: 'primary.300',
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

const Sidebar = () => {
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
      bg="white"
    >
      <Box
        w="full"
        px="2.5rem"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingBottom="1.5rem"
        borderBottom="1px solid gray"
      >
        <LogoSvg width="3.5rem" />
        <Text as="h1" fontWeight="600" fontSize="2rem" fontFamily="Montserrat">
          Antfolio
        </Text>
      </Box>
      <Box w="full" px="1rem" pt="0.5rem">
        <ButtonSidebar
          borderColor="primary.500"
          background="primary.100"
          fontWeight="600"
        >
          <RiDashboardLine fontSize="1rem" />
          <Text as="h4" fontSize="1rem" pl="0.75em">
            Projects
          </Text>
        </ButtonSidebar>
        <ButtonSidebar>
          <RiDashboardLine fontSize="1rem" />
          <Text as="h4" fontSize="1rem" pl="0.75em">
            Statics
          </Text>
        </ButtonSidebar>
        <ButtonSidebar>
          <RiDashboardLine fontSize="1rem" />
          <Text as="h4" fontSize="1rem" pl="0.75em">
            Documentation
          </Text>
        </ButtonSidebar>
        <ButtonSidebar>
          <RiDashboardLine fontSize="1rem" />
          <Text as="h4" fontSize="1rem" pl="0.75em">
            Your Plan
          </Text>
        </ButtonSidebar>
        <ButtonSidebar>
          <RiDashboardLine fontSize="1rem" />
          <Text as="h4" fontSize="1rem" pl="0.75em">
            Referral Program
          </Text>
        </ButtonSidebar>
        <ButtonSidebar>
          <GrUserSettings fontSize="1rem" />
          <Text as="h4" fontSize="1rem" pl="0.75rem">
            Settings
          </Text>
        </ButtonSidebar>
      </Box>
    </Box>
  )
}

export default Sidebar
