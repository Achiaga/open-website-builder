import { Box } from '@chakra-ui/react'
import { useTranslation } from '../../hooks/translation'
import { useRouter } from 'next/router'

import LogoSvg from '../../assets/logo'
import Button from '../commun/button'
import Twitter from '../../assets/twitter'
import Youtube from '../../assets/youtube'

const Features = () => {
  const router = useRouter()
  const [t] = useTranslation()

  const handleStartNow = () => {
    router.push(`/templates`)
  }

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
        <LogoSvg />
      </Box>
      <Box width={['200px', '537px']} d={['none', 'block']}>
        <Box display="flex" justifyContent="center" alignItems="center">
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
            onClick={handleStartNow}
          >
            {t.navbar.startNowButton}
          </Button>
        </Box>
      </Box>
      <Box
        pos="absolute"
        w="80px"
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
      </Box>
    </Box>
  )
}

export default Features
