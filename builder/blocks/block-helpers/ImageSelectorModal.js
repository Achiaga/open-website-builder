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
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
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

const UnpslashImages = ({ onSelect, selectedImg }) => {
  const [searchTerm, debouncedValue, setSearchTerm] = useDebouncedValue(
    null,
    500
  )
  const [images, setImages] = useState(null)
  function handleSelect(index) {
    onSelect({ image: images[index], index })
  }
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
            onSelect={handleSelect}
          />
        ))}
      </Box>
    </Box>
  )
}

function getUnsplashSmallImageUrl(imgObj) {
  console.log(imgObj.urls)
  return imgObj.urls.small
}

function getSelectedImgUrl(imgObj, tabIndex) {
  console.log(imgObj)
  if (tabIndex === 0) return imgObj.image.urls.regular
  return imgObj
}

const ImageSelectorModal = ({ isOpen, onClose, handleSelectImage }) => {
  const [selectedImg, setSelectedImg] = useState(null)
  const [tabIndex, setTabIndex] = useState(0)
  function onSelect(image) {
    setSelectedImg(image)
  }
  function handleApplyImage(e) {
    e.preventDefault()
    onClose()
    handleSelectImage(getSelectedImgUrl(selectedImg, tabIndex))
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Image Selector</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box minH="300px" maxH="500px" overflowY="scroll">
            <Tabs
              colorScheme="primary"
              border="none"
              outline="none"
              onChange={(index) => setTabIndex(index)}
            >
              <TabList>
                <Tab>Unsplash</Tab>
                <Tab>Antfolio</Tab>
                <Tab>Upload your own</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <UnpslashImages
                    onSelect={onSelect}
                    selectedImg={selectedImg?.index}
                  />
                </TabPanel>
                <TabPanel>
                  <ImagesGrid
                    selectedImg={selectedImg?.index}
                    onSelect={onSelect}
                  />
                </TabPanel>
                <TabPanel>
                  <p>No here yet!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
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
