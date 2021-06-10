import { Box } from '@chakra-ui/layout'
import { Tag } from '@chakra-ui/tag'

const Badge = ({ color, children }) => {
  return (
    <Tag
      size={'lg'}
      borderRadius="full"
      variant="solid"
      colorScheme={color}
      mr="1rem"
    >
      {children}
    </Tag>
  )
}

const roleColors = {
  Admin: 'purple',
  Pro: 'primary',
}

const Badges = ({ roles }) => {
  return (
    <Box my="1rem">
      {roles?.map((role, index) => {
        return (
          <Badge color={roleColors[role]} key={index}>
            {role}
          </Badge>
        )
      })}
    </Box>
  )
}

export default Badges
