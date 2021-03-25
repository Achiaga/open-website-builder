import { Box, Button } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Image from 'next/image'

const Template = ({
  handleEditTemplate,
  handlePreviewTemplate,
  templateId,
}) => {
  return (
    <Box w="100%" h="lg" pos="relative" borderRadius="10px">
      <Box
        role="group"
        pos="absolute"
        w="full"
        h="full"
        zIndex="10"
        borderRadius="10px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="transparent"
        _hover={{ bg: '#2431411f' }}
      >
        <Box
          w="full"
          px={['4rem', '6rem']}
          display="flex"
          alignContent="center"
          justifyContent="space-between"
          d="none"
          _groupHover={{ display: 'flex' }}
        >
          <Button
            boxShadow="0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)"
            fontSize="xl"
            color="white"
            bg="primary.500"
            fontWeight="bold"
            cursor="pointer"
            _hover={{ bg: '#5e76ef', color: 'white' }}
            onClick={() => handleEditTemplate(templateId)}
          >
            Select
          </Button>
          <Button
            boxShadow="0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)"
            fontSize="xl"
            color="primary.500"
            fontWeight="bold"
            cursor="pointer"
            bg="#f3f3f3"
            _hover={{ bg: 'white', color: '#5956f5' }}
            onClick={handlePreviewTemplate}
          >
            Preview
          </Button>
        </Box>
      </Box>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow:
            '0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)',
        }}
      >
        <Image
          style={{ clipPath: 'inset(0 0 0 50%)' }}
          src={`/${templateId}.png`}
          layout="fill"
          objectFit="cover"
          objectPosition="left top"
          alt="template1"
          borderRadius="100px "
        />
      </div>
    </Box>
  )
}

Template.propTypes = {
  handleEditTemplate: PropTypes.func.isRequired,
  handlePreviewTemplate: PropTypes.func.isRequired,
  templateId: PropTypes.string.isRequired,
}

export default Template
