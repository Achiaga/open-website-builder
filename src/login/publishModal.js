import Link from 'next/link'
import { Box, Text } from '@chakra-ui/layout'
import { useDispatch, useSelector } from 'react-redux'
import { getWebsiteId, setPublishStatus } from '../features/builderSlice'
import Fireworks from '../components/fireworks'
import { IoClose } from 'react-icons/io5'

const PublishSuccessModal = () => {
  const dispatch = useDispatch()
  const projectId = useSelector(getWebsiteId)

  function handleClose() {
    dispatch(setPublishStatus(null))
  }

  return (
    <Box
      left="0"
      top="0"
      pos="fixed"
      w="100vw"
      h="100vh"
      d="flex"
      flexDir="row"
      alignItems="center"
      justifyContent="center"
      bg="#0000001f"
      onClick={handleClose}
    >
      <Box
        maxWidth="60vw"
        bg="white"
        p="4rem"
        px="6.5rem"
        borderRadius="10px"
        box-shadow="0 50px 100px -20px rgb(50 50 93 / 25%), 0 30px 60px -30px rgb(0 0 0 / 30%), inset 0 -2px 6px 0 rgb(10 37 64 / 35%)"
        onClick={(e) => e.stopPropagation()}
        pos="relative"
      >
        <Box
          pos="absolute"
          top="1rem"
          right="1rem"
          _hover={{
            background: 'gray.100',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          onClick={handleClose}
        >
          <IoClose size="30px" />
        </Box>
        <Box
          color="primary.500"
          fontFamily="Montserrat"
          paddingBottom={'2'}
          mb="1rem"
          textAlign="center"
          d="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text as="h1" fontWeight="bold" fontSize={'40px'}>
            Congratulations! 🎉
          </Text>
          <Text
            as="span"
            fontSize={'35px'}
            textAlign="center"
            pt="6"
            color="black"
            d="flex"
            fontWeight="semibold"
          >
            Your Portfolio/Resume is now
          </Text>
          <Text
            as="span"
            fontSize={'35px'}
            textAlign="center"
            color="black"
            d="flex"
            pb="3"
            fontWeight="bold"
          >
            <Text color="green.500" ml="0.75rem">
              Published
            </Text>
          </Text>
          <Text as="span" fontSize={'35px'}>
            🥳 🚀 ✨
          </Text>
        </Box>
        <Text
          as="h3"
          color="black"
          fontFamily="Montserrat"
          fontSize={'md'}
          fontWeight="semibold"
        >
          This is your website Url:
        </Text>
        <a
          target="_blank"
          href={`https://www.antfolio.app/${projectId}`}
          rel="noreferrer"
        >
          <Text
            fontFamily="Montserrat"
            fontSize={'xl'}
            cursor="pointer"
            pb="2rem"
            textDecoration="underline"
            color="primary.500"
          >
            https://antfolio.app/{projectId}
          </Text>
        </a>
        <Text
          as="h3"
          color="black"
          fontFamily="Montserrat"
          fontSize={'md'}
          paddingBottom={'0'}
        >
          - Change it on your settings{' '}
          <Link
            href="/dashboard"
            onClick={() => dispatch(setPublishStatus(null))}
          >
            <Text
              as="u"
              cursor="pointer"
              color="primary.500"
              fontWeight="semibold"
            >
              here
            </Text>
          </Link>
        </Text>
      </Box>
      <Fireworks />
    </Box>
  )
}

export default PublishSuccessModal
