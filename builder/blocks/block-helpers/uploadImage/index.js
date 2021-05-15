import { Box, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { FilePond } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

function blobToBase64(blob) {
  console.log(blob)
  if (!blob && blob instanceof Blob) return 'no data'
  var reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onloadend = function () {
    var base64data = reader.result
    console.log(base64data)
  }
}

export const UploadImage = () => {
  const [files, setFiles] = useState()

  useEffect(() => {
    const pond = document.querySelector('.filepond--root')
    if (pond) {
      pond.addEventListener('FilePond:addfile', (e) => {
        console.log('File added', e.detail)
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
        }}
      >
        <FilePond
          files={files}
          allowMultiple={true}
          maxFiles={1}
          name="files"
          labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
          onupdatefiles={(fileItems) => {
            setFiles({
              files: fileItems.map((fileItem) => fileItem.file),
            })
          }}
        />
      </Box>
    </Box>
  )
}
