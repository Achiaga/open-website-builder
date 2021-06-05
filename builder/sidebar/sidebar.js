import { useState } from 'react'
import PropTypes from 'prop-types'
import { GrAdd, GrClose } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'

import {
  getBuilderDevice,
  setNewDropBlockType,
} from '../../features/builderSlice'
import TextIcon from '../../assets/text-icon'
import MediaIcon from '../../assets/media-icon'
import SectionIcon from '../../assets/section-icon'
// import FormIcon from '../../assets/form-icon'
import ButtonIcon from '../../assets/button-icon'
import FlurlyIcon from '../../assets/flurly-button'
import GumroadIcon from '../../assets/gumroad-button'
import { Box, Grid, Text } from '@chakra-ui/layout'

const ToolSection = ({ Icon, text, type, subType, ...props }) => {
  const dispatch = useDispatch()

  return (
    <Box>
      <Box
        id="safe"
        as="div"
        w="80px"
        h="50px"
        backgroundColor="transparent"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        rounded="5px"
        border="1px solid"
        borderColor="gray.200"
        className="droppable-element"
        draggable={true}
        unselectable="on"
        cursor="grab"
        opacity="0.999"
        onDragStart={(e) => {
          e.dataTransfer.setData('text/plain', 'safe')
          dispatch(setNewDropBlockType({ type, subType }))
        }}
        textAlign="center"
        color="#666f7a"
        _hover={{ color: 'gray.600', borderColor: 'black' }}
        {...props}
      >
        <Icon width="50px" colorIcon={'currentColor'} />
      </Box>
      <Box width="full" textAlign="center">
        <Text as="span" fontSize="13px" fontWeight="500">
          {text}
        </Text>
      </Box>
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
        boxShadow="0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)"
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
        bg="primary.500"
        p="50px"
        textAlign="center"
        justifyContent="center"
        alignItems="center"
        border="3px solid black"
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
            right="-1rem"
            top="0.5rem"
            _hover={{ background: '#F2F2F2;' }}
          >
            <GrClose color="white" size="1.5em" />
          </Box>
          <Box as="span" color="white" fontSize="lg" fontWeight="600">
            On the Mobile view, you can move and resize blocks but you can not
            remove or add blocks. To add new blocks go to the Desktop view.
          </Box>
        </Box>
      </Box>
    )
  return (
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
      >
        <Box fontSize="16px" color="black" fontWeight="500" mr="1rem">
          Add Elements
        </Box>
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
      <Box
        fontSize="16px"
        width="100%"
        my="0.75rem"
        background="primary.100"
        color="primary.500"
        fontWeight="500"
        display="flex"
        justifyContent="center"
        alignItems="center"
        py="0.5rem"
      >
        {'Drag & Drop'}
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={4} mt="0.25rem">
        <ToolSection Icon={TextIcon} text="Text" type="text" />
        <ToolSection Icon={MediaIcon} text="Image" type="image" />
        <ToolSection Icon={SectionIcon} text="Section" type="inception" />
        {/* <ToolSection Icon={FormIcon} text="Form" type="form" /> */}
        <ToolSection Icon={ButtonIcon} text="Button" type="button" />
        <ToolSection
          Icon={FlurlyIcon}
          text="Flurly"
          type="button"
          subType="flurly"
        />
        <ToolSection
          Icon={GumroadIcon}
          text="Gumroad"
          type="button"
          subType="gumroad"
        />
      </Grid>
    </Box>
  )
}

ToolSection.propTypes = {
  setNewDropBlockType: PropTypes.func,
  Icon: PropTypes.any,
  text: PropTypes.string,
  type: PropTypes.string,
}

export default BuilderSidebar
