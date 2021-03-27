import PropTypes from 'prop-types'

import { Box } from '@chakra-ui/react'

const BlockInception = ({ parentBlockId, ...data }) => {
  return (
    <Box
      width="100%"
      height="100%"
      border="1px dashed"
      borderColor="gray.500"
    />
  )
}

BlockInception.displayName = 'BlockInception'

BlockInception.propTypes = {
  parentBlockId: PropTypes.string,
}

export default BlockInception
