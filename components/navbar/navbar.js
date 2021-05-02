import { Box, Flex, Select } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from '../../hooks/translation'
import { AnalyticsEvent } from '../../utils/analytics'
import Button from '../commun/button'
import NavButton from './nav-button'
import LogoSvg from '../../assets/logo'

import BackgroundCircles from './background'
import { useUser } from '@auth0/nextjs-auth0'

const Navbar = ({ isSticky = true, color }) => {
  const { user } = useUser()
  const router = useRouter()
  const { locale } = router
  const [t] = useTranslation()

  const changeLanguage = (e) => {
    const locale = e.target.value
    router.push(router.pathname, router.asPath, { locale })
  }

  const handleStartNow = () => {
    AnalyticsEvent('modal_open', 'navbar')
  }

  const handleLogoRedirect = () => {
    router.push('/')
  }

  return (
    <Flex
      position={isSticky ? 'sticky' : 'absolute'}
      top="0"
      w="100%"
      h={[70, 100]}
      pr={[4, 28]}
      pl={[4, 24]}
      pt={[8, 0]}
      justify="space-between"
      align="center"
    >
      <Box
        pos="relative"
        cursor="pointer"
        zIndex="60"
        onClick={handleLogoRedirect}
      >
        <LogoSvg width="50px" />
      </Box>
      {isSticky && <BackgroundCircles />}
      <Flex
        pos="relative"
        justify="space-between"
        align="center"
        color={color || 'gray.500'}
        fontSize={['sm', 'md']}
      >
        <NavButton
          display={['none', 'block']}
          content="Templates"
          color={color || 'gray.500'}
          redirect="/templates"
          id="templates"
        />
        <NavButton
          display={['none', 'block']}
          content="Pricing"
          redirect="/pricing"
          color={color || 'gray.500'}
          id="pricing"
        />
        <NavButton
          display={['none', 'block']}
          content={user ? 'Dashboard' : 'Login'}
          redirect={user ? '/dashboard' : '/api/auth/custom-login'}
          id={user ? '/dashboard' : '/api/auth/custom-login'}
          color={color || 'gray.500'}
        />
        <Select
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
        </Select>
        <Link href={'/templates'}>
          <a>
            <Button fontSize="md" minW="4rem" h={10} onClick={handleStartNow}>
              {t.navbar.startNowButton}
            </Button>
          </a>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Navbar
