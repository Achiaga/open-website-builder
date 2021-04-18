import { Box, Button } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link'
import { removeLocalData } from '../../builder/web-builder/helpers'

const CustomButton = ({ colorScheme, children }) => {
  return (
    <Button
      boxShadow="0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)"
      fontSize="xl"
      fontWeight="bold"
      cursor="pointer"
      colorScheme={colorScheme || 'primary'}
      color={colorScheme ? 'primary.500' : '#fff'}
    >
      {children}
    </Button>
  )
}

const Template = ({ templateInfo }) => {
  function handleSelectTemplate() {
    removeLocalData()
  }
  return (
    <Box
      w="100%"
      h="lg"
      pos="relative"
      borderRadius="10px"
      overflow="hidden"
      boxShadow="0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)"
    >
      <Box
        role="group"
        pos="absolute"
        w="full"
        h="full"
        zIndex="10"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="transparent"
        _hover={{ bg: '#2431411f' }}
      >
        <Box
          w="full"
          display="flex"
          px="10%"
          alignContent="center"
          justifyContent="space-around"
          d="none"
          _groupHover={{ display: 'flex' }}
          onClick={handleSelectTemplate}
        >
          <Link href={`/builder?template=${templateInfo.id}`} passHref>
            <a>
              <CustomButton>Select</CustomButton>
            </a>
          </Link>
          <Link href={`/preview/template/${templateInfo.id}`} passHref>
            <a target="_blank">
              <CustomButton colorScheme="gray"> Preview</CustomButton>
            </a>
          </Link>
        </Box>
      </Box>
      <Box>
        <Image
          src={templateInfo.imageUrl}
          layout="fill"
          objectFit="cover"
          objectPosition="left top"
          alt={`template for the Portfolio ${templateInfo.id}`}
        />
      </Box>
    </Box>
  )
}

Template.propTypes = {
  handlePreviewTemplate: PropTypes.func.isRequired,
  templateInfo: PropTypes.any.isRequired,
}

export default Template
