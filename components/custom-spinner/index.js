import { Box } from '@chakra-ui/layout'
import styles from './style.module.css'

const CustomSpinner = ({ width = '100px', height = '100px' }) => {
  return (
    <Box pos="relative" w={width} h={height} m="auto">
      <div className={styles.loader}>
        <div className={styles.one}></div>
        <div className={styles.two}></div>
        <div className={styles.three}></div>
      </div>
    </Box>
  )
}
export default CustomSpinner
