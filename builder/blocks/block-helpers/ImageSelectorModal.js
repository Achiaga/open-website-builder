import { Button } from '@chakra-ui/button'
import { Image } from '@chakra-ui/image'
import { Box } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'

const ImageItem = ({ imageSrc }) => {
  return (
    <Box
      border="3px solid"
      borderColor="transparent"
      borderRadius="10px"
      _hover={{
        borderColor: 'blue.400',
      }}
      overflow="hidden"
      cursor="pointer"
    >
      <Image src={imageSrc} bg="blue.500" />
    </Box>
  )
}

const ImagesSrcList = [
  'https://antfolio.s3.amazonaws.com/blogImgTransparent.png',
  'https://images.unsplash.com/photo-1619314366404-275e4654e83e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'https://images.unsplash.com/photo-1619631428195-711ec2d5cb4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1619266465172-02a857c3556d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2689&q=80',
  'https://images.unsplash.com/photo-1619556819833-5b9ac82240ed?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
  'https://images.unsplash.com/photo-1619266465172-02a857c3556d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2689&q=80',
  'https://images.unsplash.com/photo-1586155638764-bf045442f5f3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'https://images.unsplash.com/photo-1619631428195-711ec2d5cb4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1619314366404-275e4654e83e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'https://images.unsplash.com/photo-1619631428195-711ec2d5cb4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1619266465172-02a857c3556d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2689&q=80',
  'https://images.unsplash.com/photo-1619556819833-5b9ac82240ed?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
  'https://images.unsplash.com/photo-1619266465172-02a857c3556d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2689&q=80',
  'https://images.unsplash.com/photo-1586155638764-bf045442f5f3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'https://images.unsplash.com/photo-1619631428195-711ec2d5cb4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
]

const ImagesGrid = () => {
  return (
    <Box
      lineHeight={0}
      style={{
        columnCount: 3,
        columnGap: '0px',
      }}
    >
      {ImagesSrcList.map((item, index) => (
        <ImageItem key={index} imageSrc={item} />
      ))}
    </Box>
  )
}

const ImageSelectorModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Images Selector</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ImagesGrid />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="primary">Apply</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ImageSelectorModal
