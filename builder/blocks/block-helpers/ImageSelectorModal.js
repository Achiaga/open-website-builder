import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@chakra-ui/button'
import { Text, ScaleFade } from '@chakra-ui/react'
import { Box } from '@chakra-ui/layout'

import { trackDownloads } from '../../../utils/unsplash'

import SidebarTab from './sidebar-tab'
import { UnpslashImages, ImagesGrid, UrlImagesTab } from './ImagesGrid'
import { AntfolioImages, AntfolioIcons, AntfolioProps } from './assets'
import { GrClose } from 'react-icons/gr'
import noScroll from 'no-scroll'

function getSelectedImgUrl(imgObj, tabIndex) {
  if (tabIndex === 0) {
    trackDownloads(imgObj?.image)
    return imgObj?.image?.urls?.full
  }
  return imgObj?.image
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

  useEffect(() => {
    if (isOpen) {
      noScroll.on()
    } else {
      noScroll.off()
    }
  }, [isOpen])

  if (isOpen) {
    return (
      <Box
        position="fixed"
        top="0"
        left="0"
        sx={{
          width: '100vw',
          height: '100vh',
          gap: '20px',
          borderRadius: '0px',
          backdropFilter: ' blur(1px)',
          backgroundColor: ' rgba(0,76,255, 0.022)',
          boxShadow: ' rgba(0, 0, 0, 0.3) 2px 8px 8px',
          border: ' 0px rgba(255,255,255,0.4) solid',
          borderBottom: ' 0px rgba(40,40,40,0.35) solid',
          borderRight: ' 0px rgba(40,40,40,0.35) solid,',
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex="99999"
      >
        <ScaleFade initialScale={0.9} in={isOpen}>
          <Box
            position="relative"
            width="1000px"
            height="1000px"
            background="white"
            zIndex="99999"
            sx={{ width: '80vw', height: '80vh' }}
            borderRadius="0.375rem"
            boxShadow="0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)"
            display="flex"
          >
            <Box
              as="button"
              position="absolute"
              right="0.65rem"
              top="0.65rem"
              textAlign="center"
              onClick={onClose}
            >
              <GrClose size="1em" />
            </Box>

            <Box
              position="absolute"
              right="1rem"
              bottom="1rem"
              textAlign="center"
            >
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                colorScheme="primary"
                onClick={handleApplyImage}
                disabled={!selectedImg}
              >
                Set Image
              </Button>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="start"
              position="relative"
              background="primary.500"
              borderRadius="0.375rem 0 0px 0.375rem"
              color="white"
              fontWeight="semibold"
              fontSize="xl"
              minWidth="15%"
              paddingTop="1rem"
            >
              <SidebarTab
                index={0}
                tabIndex={tabIndex}
                onClick={() => setTabIndex(0)}
                label={'Unsplash'}
              />
              <SidebarTab
                index={1}
                tabIndex={tabIndex}
                onClick={() => setTabIndex(1)}
                label={'Images'}
              />
              <SidebarTab
                index={2}
                tabIndex={tabIndex}
                onClick={() => setTabIndex(2)}
                label={'Props'}
              />
              <SidebarTab
                index={3}
                tabIndex={tabIndex}
                onClick={() => setTabIndex(3)}
                label={'Icons'}
                pro={false}
              />
              <SidebarTab
                index={4}
                tabIndex={tabIndex}
                onClick={() => setTabIndex(4)}
                label={'Url'}
              />
              <Box
                position="absolute"
                left="0rem"
                bottom="1.5rem"
                textAlign="center"
              >
                <Button
                  background="white"
                  color="primary.500"
                  padding="1.5rem 1.25rem"
                  onClick={() => setTabIndex(5)}
                >
                  Upload <br />
                  your Own
                </Button>
                <Text fontSize="sm" paddingTop="1rem" paddingX="1rem">
                  Upgrade to{' '}
                  <Link href="/pricing">
                    <Text
                      as="span"
                      color="gold"
                      textDecoration="underline"
                      fontWeight="800"
                    >
                      Pro
                    </Text>
                  </Link>{' '}
                  to access it!
                </Text>
              </Box>
            </Box>
            <Box
              paddingX="1.75rem"
              paddingTop="1.5rem"
              marginBottom="3.85rem"
              width="100%"
              overflow="auto"
            >
              <Box>
                {tabIndex === 0 && (
                  <UnpslashImages
                    onSelect={onSelect}
                    selectedImg={selectedImg?.index}
                  />
                )}
                {tabIndex === 1 && (
                  <ImagesGrid
                    selectedImg={selectedImg?.index}
                    onSelect={onSelect}
                    images={AntfolioImages}
                    numCol={3}
                    columnGap={'0.3rem'}
                  />
                )}
                {tabIndex === 2 && (
                  <ImagesGrid
                    selectedImg={selectedImg?.index}
                    onSelect={onSelect}
                    images={AntfolioProps}
                    numCol={7}
                    columnGap={'1rem'}
                  />
                )}
                {tabIndex === 3 && (
                  <ImagesGrid
                    selectedImg={selectedImg?.index}
                    onSelect={onSelect}
                    images={AntfolioIcons}
                    numCol={10}
                    columnGap={'3rem'}
                    padding={'0.5rem'}
                  />
                )}
                {tabIndex === 4 && <UrlImagesTab onSelect={onSelect} />}
              </Box>
            </Box>
          </Box>
        </ScaleFade>
      </Box>
    )
  }
  return null
}

export default ImageSelectorModal
