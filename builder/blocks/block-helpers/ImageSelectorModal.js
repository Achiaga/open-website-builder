import { Button } from '@chakra-ui/button'
import { Image } from '@chakra-ui/image'
import { Input } from '@chakra-ui/input'
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
import { useEffect, useState } from 'react'
import { createApi } from 'unsplash-js'
import useDebouncedValue from './useDebounce'
const ImageItem = ({ imageSrc, index, isSelcted, onSelect }) => {
  return (
    <Box
      border="3px solid"
      borderColor={isSelcted ? 'blue.400' : 'transparent'}
      borderRadius="10px"
      _hover={{
        borderColor: 'blue.400',
      }}
      overflow="hidden"
      cursor="pointer"
      onClick={() => onSelect(index)}
      mb="0.3rem"
      pos="relative"
    >
      <Image src={imageSrc} bg="blue.500" />
    </Box>
  )
}

const ImagesSrcList = [
  'https://images.unsplash.com/photo-1619314366404-275e4654e83e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'https://images.unsplash.com/photo-1619604308122-6c083d5a9345?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
  'https://images.unsplash.com/photo-1619602662217-938271505f2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
  'https://images.unsplash.com/photo-1619314527562-9b962f41f88a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
  'https://images.unsplash.com/photo-1619631632892-3e5b9ff8fef9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80',
]

const unsplash = createApi({
  // eslint-disable-next-line no-undef
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API,
})
const ImagesGrid = ({ onSelect, selectedImg, images = [] }) => {
  return (
    <Box
      lineHeight={0}
      style={{
        columnCount: 3,
        columnGap: '0.3rem',
      }}
    >
      {images?.map((item, index) => (
        <ImageItem
          key={index}
          imageSrc={getUnsplashSmallImageUrl(item)}
          index={index}
          isSelcted={selectedImg === index}
          onSelect={onSelect}
        />
      ))}
    </Box>
  )
}

const UnpslashImages = () => {
  const [searchTerm, debouncedValue, setSearchTerm] = useDebouncedValue(
    null,
    500
  )
  const [images, setImages] = useState(null)
  useEffect(() => {
    unsplash.search
      .getPhotos({
        query: searchTerm,
      })
      .then((result) => {
        if (result.errors) {
          console.log('error occurred: ', result.errors[0])
        } else {
          const photos = result.response.results
          setImages(photos)
        }
      })
  }, [debouncedValue])
  return (
    <Box>
      <Input
        placeholder="search for an image"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ImagesGrid images={images} />
    </Box>
  )
}

function getUnsplashSmallImageUrl(imgObj) {
  return imgObj.urls.small
}

const ImageSelectorModal = ({ isOpen, onClose, handleSelectImage }) => {
  const [selectedImgIndex, setSelectedImg] = useState(null)
  function onSelect(index) {
    setSelectedImg(index)
  }
  function handleApplyImage(e) {
    e.preventDefault()
    onClose()
    handleSelectImage(ImagesSrcList[selectedImgIndex])
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Image Selector</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box maxH="500px" overflowY="scroll">
            <UnpslashImages />
            {/* <ImagesGrid selectedImg={selectedImgIndex} onSelect={onSelect}/> */}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="primary" onClick={handleApplyImage}>
            Set Image
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ImageSelectorModal
