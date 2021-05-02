import { Image } from '@chakra-ui/image'
import { Input } from '@chakra-ui/input'
import { Box } from '@chakra-ui/layout'
import { Grid, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { unsplash } from '../../../utils/unsplash'
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
  return imgObj?.urls?.small
}

function getUnsplashLink(imgObj) {
  return imgObj?.user?.links?.html
}

function getUnsplashAuthor(imgObj) {
  return imgObj?.user?.name
}

const UnsplashImageItem = ({
  imageSrc,
  index,
  isSelcted,
  onSelect,
  author,
  authorLink,
  indexcol,
}) => {
  return (
    <Box mb=".5rem">
      <Box
        pos="relative"
        border="3px solid"
        borderColor={isSelcted ? 'blue.400' : 'transparent'}
        borderRadius="10px"
        _hover={{
          borderColor: 'blue.400',
        }}
        cursor="pointer"
        overflow="hidden"
        width="full"
        onClick={() => onSelect([indexcol, index])}
      >
        <Image src={imageSrc} />
      </Box>
      <Text as="p" color="gray.300" fontSize="12px" textAlign="end">
        by{' '}
        <a
          href={authorLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'underline' }}
        >
          {author}
        </a>
      </Text>
    </Box>
  )
}

function getColumns(images) {
  const colum1 = images.slice(0, images.length / 3)
  const colum2 = images.slice(images.length / 3, (2 * images.length) / 3)
  const colum3 = images.slice((2 * images.length) / 3, images.length)
  return [colum1, colum2, colum3]
}

export const UnpslashImages = ({ onSelect, selectedImg }) => {
  const [searchTerm, debouncedValue, setSearchTerm] = useDebouncedValue(
    null,
    500
  )
  const [images, setImages] = useState([])
  function handleSelect([col, index]) {
    const cols = getColumns(images)
    onSelect({ image: cols[col][index], index: [col, index] })
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
  const columns = getColumns(images)
  return (
    <Box>
      <Input
        marginBottom="1rem"
        placeholder="search for an image"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Grid
        templateColumns="repeat(3,minmax(0,1fr))"
        columnGap={3}
        justifyContent="space-between"
        justifyItems="center"
      >
        {columns.map((item, indexcol) => {
          return (
            <Box key={indexcol}>
              {item?.map((item, index) => (
                <UnsplashImageItem
                  key={index}
                  indexcol={indexcol}
                  imageSrc={getUnsplashSmallImageUrl(item)}
                  author={getUnsplashAuthor(item)}
                  authorLink={getUnsplashLink(item)}
                  index={index}
                  isSelcted={
                    selectedImg?.[1] === index && selectedImg?.[0] === indexcol
                  }
                  onSelect={handleSelect}
                />
              ))}
            </Box>
          )
        })}
      </Grid>
    </Box>
  )
}
