import {Box} from "@chakra-ui/react"

const VideoDemo = () => {
    return(
        <Box borderRadius="10px">
            <video style={{borderRadius:"10px", boxShadow:"0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)"}} src={"/hero-video.mp4"} width="1100" height="800" controls="controls" />
        </Box>
    )
}

export default VideoDemo