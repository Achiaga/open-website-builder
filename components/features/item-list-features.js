import { Box, Text } from '@chakra-ui/react'

const ItemListFeatures = ({
  keyItem,
  title,
  text,
  textIndex,
  handleTextIndex,
}) => {
  return (
    <Box>
      <Text
        as="h4"
        w={['auto', '100%']}
        pl={['1rem', '0']}
        pt="0.75rem"
        onClick={handleTextIndex}
        id={keyItem}
        cursor="pointer"
        color={textIndex === keyItem ? `primary.500` : `primary.300`}
        fontFamily="Montserrat"
        fontSize="25px"
        fontStyle="normal"
        fontWeight="700"
        lineHeight="30px"
        letterSpacing="0em"
        textAlign="left"
      >
        {title}
      </Text>
      {textIndex === keyItem && (
        <Text
          as="p"
          pt={['1rem', 0]}
          pl={['1rem', '0']}
          w="350px"
          color="gray.600"
          fontFamily="Montserrat"
          fontSize="22px"
          fontStyle="normal"
          lineHeight="28px"
          letterSpacing="0em"
          textAlign="left"
        >
          {text}
        </Text>
      )}
    </Box>
  )
}

export default ItemListFeatures
