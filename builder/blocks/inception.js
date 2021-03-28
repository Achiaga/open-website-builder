import PropTypes from 'prop-types'

import { Box } from '@chakra-ui/react'

const BlockInception = (props) => {
  const inceptionModifiers = {
    backgroundColor: props.backgroundColor,
    boxShadow: props.boxShadow,
    imageUrl: props.imageUrl,
  }
  return (
    <Box
      width="100%"
      height="100%"
      border="1px dashed"
      borderColor="gray.500"
      backgroundImage={`url(${inceptionModifiers.imageUrl})`}
      backgroundPosition="50% 50%"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      {...inceptionModifiers}
    />
  )
}

BlockInception.displayName = 'BlockInception'

BlockInception.propTypes = {
  parentBlockId: PropTypes.string,
}

export default BlockInception
