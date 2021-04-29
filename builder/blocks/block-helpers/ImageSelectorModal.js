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
      // mb="0.3rem"
      pos="relative"
    >
      <Image src={imageSrc} />
    </Box>
  )
}

const AntfolioImages = [
  'https://antfolio.s3.amazonaws.com/mac-study-model.png',
  'https://antfolio.s3.amazonaws.com/blogImgTransparent.png',
  'https://antfolio.s3.amazonaws.com/books-study-model.png',
]

const unsplash = createApi({
  // eslint-disable-next-line no-undef
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API,
})
const ImagesGrid = ({ onSelect, selectedImg, images = [] }) => {
  function handleSelect(index) {
    onSelect({ image: images[index], index })
  }
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
          imageSrc={item}
          index={index}
          isSelcted={selectedImg === index}
          onSelect={handleSelect}
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
        query: searchTerm || 'happy person',
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
  return imgObj.urls.small
}

function getSelectedImgUrl(imgObj, tabIndex) {
  if (tabIndex === 0) return imgObj.image.urls.regular
  return imgObj.image
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
                    images={AntfolioImages}
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
