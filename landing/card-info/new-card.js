import { Box, List, ListItem, Text } from '@chakra-ui/layout'
import CheckList from '../../assets/check-list'

const NewCard = ({ title, body, listCard }) => {
  return (
    <Box
      w={['100%', '50%']}
      bg="primary.100"
      px={['1rem', '3rem']}
      py={'3rem'}
      borderRadius={['0px 0px 20px 20px ', '0px 20px 20px 0px']}
    >
      <Text
        as="h4"
        fontFamily="Montserrat"
        color="primary.500"
        fontSize="24px"
        fontStyle="normal"
        fontWeight="700"
        lineHeight="29px"
        letterSpacing="0em"
        textAlign="start"
      >
        {title}
      </Text>
      <Text
        as="p"
        pt="1rem"
        fontFamily="Montserrat"
        fontSize="16px"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="26px"
        letterSpacing="0em"
        textAlign="start"
      >
        {body}
      </Text>
      <List paddingTop="3.5rem" spacing="2" fontSize="14px">
        {Object.keys(listCard).map((item, index) => {
          return (
            <ListItem key={index} display="flex" alignItems="center">
              <Box marginRight="0.5rem">
                <CheckList />
              </Box>
              {listCard[item]}
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

export default NewCard
