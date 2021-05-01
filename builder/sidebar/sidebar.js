import { Box, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { motion, useCycle } from 'framer-motion'
import { GrAdd, GrClose } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'

import {
  getBuilderDevice,
  setNewDropBlockType,
} from '../../features/builderSlice'
import TextIcon from '../../assets/text-icon'
import MediaIcon from '../../assets/media-icon'
import SectionIcon from '../../assets/section-icon'

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(1px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

const ToolSection = ({ Icon, text, type, ...props }) => {
  const dispatch = useDispatch()
  return (
    <Box
      id="safe"
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
      borderColor="primary.500"
      className="droppable-element"
      draggable={true}
      unselectable="on"
      cursor="grab"
      opacity="0.999"
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', 'safe')
        dispatch(setNewDropBlockType(type))
      }}
      _hover={{ background: '#F2F2F2;' }}
      {...props}
    >
      <Icon width="25px" />
      <Text as="span" fontSize="16px" paddingLeft="0.6rem">
        {text}
      </Text>
    </Box>
  )
}

const BuilderSidebar = () => {
  const builderDevice = useSelector(getBuilderDevice)
  const [isOpen, toggleOpen] = useCycle(false, true)

  const isMobile = builderDevice === 'mobile'

  if (!isOpen)
    return (
      <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'}>
        <motion.div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
            background: '#fff',
            zIndex: '99999',
            borderRadius: '0.375rem',
            boxShadow:
              '0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)',
          }}
          variants={sidebar}
        />
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
          boxShadow="0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)"
          _hover={{
            bg: !isMobile && 'white',
            border: !isMobile && '1px solid',
          }}
          onClick={() => toggleOpen()}
        >
          <GrAdd size="2.2em" />
        </Box>
      </motion.nav>
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
            onClick={() => toggleOpen()}
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
          <Box fontSize="16px" color="primary.500" fontWeight="500" mr="1rem">
            Drag & Drop{' '}
          </Box>
          <Box
            cursor="pointer"
            onClick={() => toggleOpen()}
            p="0.25rem"
            borderRadius="0.25rem"
            _hover={{ background: '#F2F2F2;' }}
          >
            <GrClose size="1em" />
          </Box>
        </Box>
        <ToolSection Icon={TextIcon} text="Text" type="text" />
        <ToolSection Icon={MediaIcon} text="Image" type="image" />
        <ToolSection Icon={SectionIcon} text="Section" type="inception" />
        <ToolSection Icon={SectionIcon} text="Form" type="form" />
        <ToolSection Icon={SectionIcon} text="Button" type="button" />
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
