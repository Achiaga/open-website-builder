import { Box } from '@chakra-ui/react'

const Template = ({ children }) => {
  return (
    <Box w="100%" h="lg">
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow:
            '0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)',
        }}
      >
        {children}
      </div>
    </Box>
  )
}

export default Template
