import { useState } from 'react'
import Link from 'next/link'
import { Box, Spinner } from '@chakra-ui/react'
import { useTranslation } from '../../hooks/translation'
import { useRouter } from 'next/router'

import LogoSvg from '../../assets/logo'
import Button from '../commun/button'
import Twitter from '../../assets/twitter'

const Features = () => {
  const router = useRouter()
  const [t] = useTranslation()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitEmail = () => {
    router.push('/api/auth/custom-login')
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
        <Box as="form" onSubmit={handleSubmitEmail}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              type="submit"
              w="212px"
              fontSize="18px"
              bg={isSuccess ? 'green.500' : 'primary.500'}
              _hover={{ bg: `${isSuccess ? 'green.500' : 'primary.500'}` }}
              _active={{
                bg: `${isSuccess ? 'green.500' : 'primary.500'}`,
                transform: 'scale(0.98)',
                borderColor: '#bec3c9',
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : isSuccess ? (
                t.button_success
              ) : (
                t.footer.button
              )}
            </Button>
          </Box>
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
        <Link href="https://twitter.com/ResumesStandout" passHref={true}>
          <Button padding="0" border="none" bg="transparent">
            <Twitter />
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default Features
