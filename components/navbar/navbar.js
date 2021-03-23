import { Flex, Select } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useTranslation } from '../../hooks/translation'
import { AnalyticsEvent } from '../../utils/analytics'
import Button from '../commun/button'
import NavButton from './nav-button'

import BackgroundCircles from './background'

const Navbar = () => {
  const router = useRouter()
  const { locale } = router
  const [t] = useTranslation()

  const changeLanguage = (e) => {
    const locale = e.target.value
    router.push(router.pathname, router.asPath, { locale })
  }

  const handleStartNow = () => {
    AnalyticsEvent('modal_open', 'navbar')
    router.push(`/templates`)
  }

  const handleNavRouting = (e) => {
    const { id } = e.currentTarget
    console.log(id)
    router.push(`/${id}`)
  }

  const handleLogin = () => {
    router.push('/api/auth/custom-login')
  }

  return (
    <Flex
      position="sticky"
      top="0"
      w="100%"
      h={[70, 100]}
      pr={[4, 28]}
      pl={[4, 24]}
      pt={[8, 0]}
      justify="space-between"
      align="center"
      fontFamily="Montserrat"
    >
      <BackgroundCircles />
      <Flex
        pos="relative"
        justify="space-between"
        align="center"
        color="black"
        fontSize={['sm', 'md']}
      >
        <NavButton
          onClick={handleNavRouting}
          content="Templates"
          id="templates"
        />
        <NavButton onClick={handleNavRouting} content="Pricing" id="pricing" />
        <NavButton onClick={handleNavRouting} content="About Us" id="about" />
        <NavButton
          onClick={handleLogin}
          content="Login"
          id="login"
          borderBottom="1px solid black"
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
          <option color="black" value="en">
            en
          </option>
          <option color="black" value="es">
            es
          </option>
        </Select>
        <Button fontSize="md" minW="4rem" h={10} onClick={handleStartNow}>
          {t.navbar.startNowButton}
        </Button>
      </Flex>
    </Flex>
  )
}

export default Navbar
