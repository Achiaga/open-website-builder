import { Box, Text } from '@chakra-ui/react'
import { useEffect } from 'react'

import { uploadImageToS3 } from '../transporter'
import { useSelector } from 'react-redux'
import { getUserId } from '../../../../features/builderSlice'

import dynamic from 'next/dynamic'

import 'filepond/dist/filepond.min.css'

const FilePond = dynamic(() =>
  import('react-filepond').then((mod) => mod.FilePond)
)

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
  const userId = useSelector(getUserId)
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
          server="/api"
          labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
        />
      </Box>
    </Box>
  )
}
