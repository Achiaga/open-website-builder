import { Box, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from '../../hooks/translation'
import { AnalyticsEvent } from '../../utils/analytics'
import Button from '../commun/button'
import NavButton from './nav-button'
import LogoSvg from '../../assets/logo'

import BackgroundCircles from './background'
import { useUser } from '@auth0/nextjs-auth0'

const LoginButton = ({ color }) => {
  const { user } = useUser()
  return (
    <NavButton
      display={['none', 'block']}
      content={user ? 'Dashboard' : 'Login'}
      redirect={user ? '/dashboard' : '/api/auth/custom-login'}
      id={user ? '/dashboard' : '/api/auth/custom-login'}
      color={color || 'gray.500'}
      fontSize="sm"
    />
  )
}

const noUserAccess = ['/blog']

const Navbar = ({ isSticky = true, color }) => {
  const router = useRouter()
  // const { locale } = router
  const [t] = useTranslation()

  // const changeLanguage = (e) => {
  //   const locale = e.target.value
  //   router.push(router.pathname, router.asPath, { locale })
  // }
  const hideLoginButton = new RegExp(noUserAccess.join('|')).test(
    router.pathname
  )
  const handleStartNow = () => {
    AnalyticsEvent('modal_open', 'navbar')
  }

  return (
    <Flex
      position={isSticky ? 'sticky' : 'absolute'}
      top="0"
      w="100%"
      h={[50, '60px']}
      pr={[4, 28]}
      pl={[4, 24]}
      pt={[8, 1]}
      flexDirection="row"
      alignItems="center"
    >
      <Box
        pos="relative"
        w="100%"
        display="flex"
        justifyContent="left"
        align-items="center"
        zIndex="60"
      >
        <Link href="/">
          <Box display="flex" alignItems="center" cursor="pointer">
            <LogoSvg width="35px" />
          </Box>
        </Link>
      </Box>
      {/* {isSticky && <BackgroundCircles />} */}
      <Flex
        display="flex"
        w="100%"
        justifyContent="center"
        alignItems="center"
        margin="0"
        width="100%"
        background-color="transparent"
      >
        <NavButton
          display={['none', 'block']}
          content="Templates"
          color={color || 'gray.500'}
          redirect="/templates"
          id="templates"
          fontSize="sm"
        />
        <NavButton
          display={['none', 'block']}
          content="Pricing"
          redirect="/pricing"
          color={color || 'gray.500'}
          id="pricing"
          fontSize="sm"
        />
      </Flex>
      <Flex
        pos="relative"
        justifyContent="flex-end"
        alignItems="center"
        w="100%"
        margin="0"
        background-color="transparent"
        color={color || 'gray.500'}
        fontSize={['sm', 'sm']}
      >
        {!hideLoginButton && <LoginButton color={color} />}
        {/* <Select
          border="none"
          bg="none"
          w="4.5rem"
          mr={4}
          fontSize="lg"
          cursor="pointer"
          fontWeight="500"
          onChange={changeLanguage}
          defaultValue={locale}
        >
          <option color={color || 'gray.500'} value="en">
            en
          </option>
          <option color={color || 'gray.500'} value="es">
            es
          </option>
        </Select> */}
        <Link href={'/templates'}>
          <a>
            <Button
              ml="1rem"
              fontSize="sm"
              minW="1rem"
              px="0.5rem"
              h={8}
              onClick={handleStartNow}
              background="black"
              _hover={{
                borderBottom: '2px solid',
                borderColor: color || 'gray.500',
              }}
            >
              {t.navbar.startNowButton}
            </Button>
          </a>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Navbar
