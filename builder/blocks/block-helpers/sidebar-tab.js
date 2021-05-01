import { Box } from '@chakra-ui/layout'

const SidebarTab = ({ tabIndex, index, label, onClick }) => {
  return (
    <Box cursor="pointer" padding="8px 0" width="100%" textAlign="left">
      <Box
        as="button"
        background="transparent"
        border="none"
        onClick={onClick}
        paddingRigth="2rem"
        paddingLeft=".75rem"
        marginLeft=".5rem"
        width="100%"
        fontWeight="semibold"
        fontSize="xl"
        textAlign="left"
        borderLeft={'3px solid'}
        borderColor={`${tabIndex === index ? 'white' : 'transparent'}`}
        transition="all ease"
      >
        {label}
      </Box>
    </Box>
  )
}

export default SidebarTab
