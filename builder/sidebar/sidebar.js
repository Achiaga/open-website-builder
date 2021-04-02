import { Box, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { GrAdd, GrClose } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import {
  BsTextCenter,
  BsCardImage,
  BsLayoutTextWindowReverse,
} from 'react-icons/bs'

import {
  getBuilderDevice,
  setNewDropBlockType,
} from '../../features/builderSlice'

const ToolSection = ({ Icon, text, type, ...props }) => {
  const dispatch = useDispatch()
  return (
    <Box
      as="div"
      h="40px"
      w="full"
      backgroundColor="transparent"
      marginBottom="0.4rem"
      display="flex"
      alignItems="center"
      justifyContent="left"
      rounded="10px"
      padding="5px"
      paddingX="10px"
      border="1px solid"
      className="droppable-element"
      draggable={true}
      unselectable="on"
      cursor="grab"
      opacity="0.999"
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', '')
        dispatch(setNewDropBlockType(type))
      }}
      _hover={{ background: '#F2F2F2;' }}
      {...props}
    >
      <Icon size="1.3rem" />
      <Text as="span" fontSize="16px" paddingLeft="0.6rem">
        {text}
      </Text>
    </Box>
  )
}

const BuilderSidebar = () => {
  const builderDevice = useSelector(getBuilderDevice)
  const [isOpen, setIsOpen] = useState(false)

  const isMobile = builderDevice === 'mobile'

  if (!isOpen)
    return (
      <Box
        as="button"
        pos="fixed"
        top="10px"
        right="10px"
        zIndex="9999"
        border="1px solid transparent"
        borderRadius="10px"
        w="60px"
        h="60px"
        backgroundColor="#ffffff42"
        justifyContent="center"
        d="flex"
        alignItems="center"
        cursor="pointer"
        boxShadow="0 13px 27px -5px rgba(50,50,93,0.25),0 8px 16px -8px rgba(0,0,0,0.3)"
        _hover={{
          bg: !isMobile && 'white',
          border: !isMobile && '1px solid',
        }}
        onClick={() => setIsOpen(true)}
      >
        <GrAdd size="2.2em" />
      </Box>
    )
  if (isMobile && isOpen)
    return (
      <Box
        pos="fixed"
        top="20%"
        left="20%"
        right="20%"
        zIndex="9999"
        bg="white"
        p="10px"
        textAlign="center"
        justifyContent="center"
        alignItems="center"
        boxShadow="0 13px 27px -5px rgba(50,50,93,0.25),0 8px 16px -8px rgba(0,0,0,0.3)"
        borderRadius="1rem"
      >
        <Box pos="relative">
          <Box
            pos="absolute"
            cursor="pointer"
            onClick={() => setIsOpen(false)}
            p="0.25rem"
            borderRadius="0.25rem"
            right="1rem"
            _hover={{ background: '#F2F2F2;' }}
          >
            <GrClose size="1.5em" />
          </Box>
          <Box as="span" fontSize="lg">
            On the <b>Mobile</b> view you can <b>move</b>, <b>resize</b> and
            <b> remove</b> blocks but not add. <br />
            To <b>add</b> new blocks go to the <b>Desktop</b> view.
          </Box>
        </Box>
      </Box>
    )
  return (
    <>
      <Box
        d="flex"
        flexDir="column"
        pos="fixed"
        top="10px"
        right="10px"
        zIndex="9999"
        bg="white"
        p="10px"
        boxShadow="0 13px 27px -5px rgba(50,50,93,0.25),0 8px 16px -8px rgba(0,0,0,0.3)"
        borderRadius="10px"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          w="full"
          paddingBottom="0.9rem"
        >
          <Box fontSize="16px"></Box>
          <Box
            cursor="pointer"
            onClick={() => setIsOpen(false)}
            p="0.25rem"
            borderRadius="0.25rem"
            _hover={{ background: '#F2F2F2;' }}
          >
            <GrClose size="1em" />
          </Box>
        </Box>
        <ToolSection Icon={BsTextCenter} text="Text" type="text" />
        <ToolSection Icon={BsCardImage} text="Image" type="image" />
        <ToolSection
          Icon={BsLayoutTextWindowReverse}
          text="Section"
          type="inception"
        />
      </Box>
    </>
  )
}

ToolSection.propTypes = {
  setNewDropBlockType: PropTypes.func,
  Icon: PropTypes.any,
  text: PropTypes.string,
  type: PropTypes.string,
}

export default BuilderSidebar
