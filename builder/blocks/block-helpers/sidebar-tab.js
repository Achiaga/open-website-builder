import { Box } from '@chakra-ui/layout'

const SidebarTab = ({ tabIndex, index, label, pro = false, onClick }) => {
  return (
    <Box
      cursor="pointer"
      position="relative"
      padding="8px 0"
      width="100%"
      textAlign="left"
    >
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
      {pro && (
        <Box
          position="absolute"
          borderRadius="25px"
          background="gold"
          color="primary.500"
          top="0.9rem"
          right="1.5rem"
          width="30px"
          display="flex"
          justifyContent="center"
          fontSize="12px"
          fontWeight="800"
          boxShadow="0px 10px 50px 0px #00000033"
        >
          Pro
        </Box>
      )}
    </Box>
  )
}

export default SidebarTab
