import { Box, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { useTranslation } from '../../hooks/translation'
import Button from '../commun/button'
import NavButton from './nav-button'
import LogoSvg from '../../assets/logo'

// import BackgroundCircles from './background'
import { useEffect, useState } from 'react'

const Navbar = ({ isSticky = true, color }) => {
  const [t] = useTranslation()
  const [scrollY, setScrollY] = useState(0)
  const [redirectLogo, setRedirectLogo] = useState('/')
  const [redirectTemplates, setRedirectTemplates] = useState('/templates')

  useEffect(() => {
    if (localStorage.getItem('isGumroad')) {
      setRedirectLogo('/gumroad')
      setRedirectTemplates('/gumroad/templates')
    }
  }, [])

  function handleScroll() {
    if (window.scrollY < 80) setScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <Flex
      position={isSticky ? 'sticky' : 'relative'}
      top="0"
      w="100%"
      bgColor="#f8f9fb"
      h={['70px', '70px']}
      pr={[4, 4, 28]}
      pl={[4, 4, 24]}
      pt={[1, 1]}
      flexDirection="row"
      alignItems="center"
      zIndex="9999"
      boxShadow={scrollY > 50 ? '11px 15px 29px 0 rgb(48 48 48 / 7%)' : 'unset'}
    >
      <Box
        pos="relative"
        w="100%"
        display="flex"
        justifyContent="left"
        align-items="center"
        zIndex="60"
      >
        <Link href={redirectLogo}>
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
          display={['none', 'none', 'block']}
          content="Templates"
          color={color || 'gray.500'}
          redirect={redirectTemplates}
          id="templates"
          fontSize="sm"
        />
        <NavButton
          display={['none', 'none', 'block']}
          content="Guides"
          redirect="/guides"
          color={color || 'gray.500'}
          id="guide"
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
        <Link href={'/templates'}>
          <a>
            <Button
              ml="1rem"
              fontSize="sm"
              minW="1rem"
              px="0.5rem"
              h={8}
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
