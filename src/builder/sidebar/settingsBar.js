import { Box } from '@chakra-ui/layout'
import Login from '../../login'

export const SettingsBar = () => {
  return (
    <Box pos="fixed" left="10px" top="10px" zIndex="9999">
      <Login />
    </Box>
  )
}
