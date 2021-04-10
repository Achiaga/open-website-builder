import PropTypes from 'prop-types'

import { Box } from '@chakra-ui/react'

const BlockInception = (props) => {
  const border = props.border === 'none' ? '1px dashed black' : props.border
  const inceptionModifiers = {
    backgroundColor: props.backgroundColor,
    boxShadow: props.boxShadow,
    border: border,
    borderRadius: props.borderRadius,
  }
  console.log(props.border)
  return (
    <Box
      width="100%"
      height="100%"
      border="1px dashed"
      borderColor="gray.500"
      backgroundImage={`url(${props.imageUrl})`}
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
