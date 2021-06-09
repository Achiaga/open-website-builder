import { Box } from '@chakra-ui/layout'

const VideoDemo = () => {
  return (
    <Box
      borderRadius={['5px', '10px']}
      px={['1rem', 0]}
      pb={['4rem', 0]}
      zIndex="2"
      maxWidth="90%"
      margin="auto"
    >
      <video
        style={{
          borderRadius: '10px',

          boxShadow:
            '0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)',
        }}
        src={'/hero-video.mp4'}
        width="1100"
        height="800"
        muted
        controls
        autoPlay
        loop
      />
    </Box>
  )
}

export default VideoDemo
