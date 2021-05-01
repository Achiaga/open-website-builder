import { Image } from '@chakra-ui/image'
import { Input } from '@chakra-ui/input'
import { Box } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { createApi } from 'unsplash-js'
import useDebouncedValue from './useDebounce'

const ImageItem = ({ imageSrc, index, isSelcted, onSelect }) => {
  return (
    <Box
      pos="relative"
      border="3px solid"
      borderColor={isSelcted ? 'blue.400' : 'transparent'}
      borderRadius="10px"
      _hover={{
        borderColor: 'blue.400',
      }}
      overflow="hidden"
      cursor="pointer"
      onClick={() => onSelect(index)}
    >
      <Image src={imageSrc} />
    </Box>
  )
}

export const ImagesGrid = ({
  onSelect,
  selectedImg,
  numCol = '3',
  columnGap = '0.3rem',
  images = [],
}) => {
  function handleSelect(index) {
    onSelect({ image: images[index], index })
  }
  return (
    <Box
      lineHeight={0}
      style={{
        columnCount: numCol,
        columnGap: columnGap,
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

// Unsplash Grid

function getUnsplashSmallImageUrl(imgObj) {
  return imgObj.urls.small
}

const unsplash = createApi({
  // eslint-disable-next-line no-undef
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API,
})

export const UnpslashImages = ({ onSelect, selectedImg }) => {
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
