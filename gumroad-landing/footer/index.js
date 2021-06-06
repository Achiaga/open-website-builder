import { Box } from '@chakra-ui/layout'
import { useTranslation } from '../../hooks/translation'
import Link from 'next/link'

import LogoSvg from '../../assets/logo'
import Twitter from '../../assets/twitter'
import Youtube from '../../assets/youtube'
import Linkedin from '../../assets/linkedin'
import Button from '../../components/commun/button'

const Features = () => {
  const [t] = useTranslation()

  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height={['100px', '220px']}
      marginTop={['0rem', '10rem']}
    >
      <Box pos="absolute" left="4rem">
        <LogoSvg width={45} />
      </Box>
      <Box width={['200px', '537px']} d={['none', 'block']}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Link href="/templates">
            <Button
              w="212px"
              fontSize="18px"
              bg={'primary.500'}
              _hover={{ bg: `${'primary.500'}` }}
              _active={{
                bg: `${'primary.500'}`,
                transform: 'scale(0.98)',
                borderColor: '#bec3c9',
              }}
            >
              {t.navbar.startNowButton}
            </Button>
          </Link>
        </Box>
      </Box>
      <Box
        pos="absolute"
        right="4rem"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <a
          target="_blank"
          href="https://twitter.com/antfolio_app"
          rel="noopener noreferrer"
        >
          <Button padding="0" border="none" bg="transparent">
            <Twitter />
          </Button>
        </a>
        <a
          target="_blank"
          href="https://www.youtube.com/channel/UCgBOJ-yayl77XIXvgm0hCzw"
          rel="noopener noreferrer"
        >
          <Button padding="0" border="none" bg="transparent">
            <Youtube />
          </Button>
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/company/antfolio-app"
          rel="noopener noreferrer"
        >
          <Button padding="0" border="none" bg="transparent">
            <Linkedin />
          </Button>
        </a>
      </Box>
    </Box>
  )
}

export default Features
