import { Box, Button, Text } from '@chakra-ui/react'
import { useEffect } from 'react'

import { FilePond } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'
import { uploadImageToS3 } from '../transporter'
import { useDispatch, useSelector } from 'react-redux'
import {
  getIsUserPro,
  getUserId,
  saveWebsite,
} from '../../../../features/builderSlice'
import Link from 'next/link'

async function uploadFile(blob, userId, onSelect) {
  const { name, type } = blob
  var reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onloadend = async function () {
    var base64data = reader.result
    const { url } = await uploadImageToS3(base64data, name, type, userId)
    onSelect({ image: url })
  }
}
export const UploadImage = ({ onSelect }) => {
  const dispatch = useDispatch()
  const userId = useSelector(getUserId)
  const isPro = useSelector(getIsUserPro)

  function handlePro() {
    dispatch(saveWebsite())
  }

  useEffect(() => {
    const pond = document.querySelector('.filepond--root')
    if (pond) {
      pond.addEventListener('FilePond:addfile', (e) => {
        const file = e.detail.pond.getFile().file
        if (file.type !== 'text/html') {
          uploadFile(file, userId, onSelect)
        }
      })
    }
  }, [])

  return (
    <Box w="full">
      <Box
        w="full"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mb="5rem"
      >
        <Text
          as="h1"
          fontSize="40px"
          mb="0.5rem"
          fontWeight="bold"
          color="primary.500"
        >
          Upload Your Own Image
        </Text>
        <Text as="p" fontSize="18px" fontWeight="regular" color="gray.400">
          Accept images in JPEG, PNG, GIF (up to 1MB) and SVG format.
        </Text>
      </Box>
      {isPro ? (
        <Box
          px="8rem"
          mt="3rem"
          height="100%"
          width="100%"
          sx={{
            '.filepond--root ': {
              'max-height': '10em !important',
            },
            '.filepond--credits': {
              display: 'none',
            },
          }}
        >
          <FilePond
            allowMultiple={true}
            maxFiles={1}
            server="/api/empty"
            labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
          />
        </Box>
      ) : (
        <Box
          d="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          h="200px"
        >
          <Text as="span" fontSize="20px" fontWeight="regular" color="gray.500">
            Upload Images with{' '}
            <Link href="/pricing" passHref>
              <a>
                <Button
                  colorScheme="green"
                  size="lg"
                  bg="linear-gradient(91.56deg, #43E28E 0%, #506bf0 122.55%)"
                  border="1px solid"
                  borderColor="primary.600"
                  onClick={handlePro}
                  boxShadow="md"
                  _hover={{
                    filter: 'brightness(1.1)',
                  }}
                >
                  Antfolio Pro
                </Button>
              </a>
            </Link>
          </Text>
        </Box>
      )}
    </Box>
  )
}
