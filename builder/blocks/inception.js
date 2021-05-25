import PropTypes from 'prop-types'

import { Box } from '@chakra-ui/react'

const BlockInception = (props) => {
  const border = props.border === 'none' ? '1px dashed black' : props.border
  const gradient = props.gradientColor || []
  const inceptionModifiers = {
    backgroundColor: props.backgroundColor,
    boxShadow: props.boxShadow,
    border: border,
    borderRadius: props.borderRadius,
  }
  return (
    <Box
      width="100%"
      height="100%"
      border="1px dashed"
      backgroundImage={`url(${props.imageUrl})`}
      backgroundPosition="50% 50%"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      {...inceptionModifiers}
      background={`linear-gradient(225deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#000000',
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: props.opacity || 0,
          overflow: 'hidden',
          borderRadius: props.borderRadius,
        }}
      />
    </Box>
  )
}

BlockInception.displayName = 'BlockInception'

BlockInception.propTypes = {
  parentBlockId: PropTypes.string,
}

export default BlockInception
