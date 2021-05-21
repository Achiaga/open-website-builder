import { Box, Text } from '@chakra-ui/react'
import { useTranslation } from '../../../../hooks/translation'

import BackgroundCircle from './background'
import OldCard from './old-card'
import NewCard from './new-card'

const Steps = () => {
  const [t] = useTranslation()

  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="100%"
      mt="6rem"
      mb="4rem"
      px={['1.5rem', '10rem']}
      flexDirection="column"
    >
      <BackgroundCircle />
      <Text
        as="h1"
        position="relative"
        fontWeight="bold"
        textAlign="center"
        fontSize={['2.5rem', '50px']}
        lineHeight={['3rem', '4rem']}
      >
        {t.card_info.title}
        <br />
        <Text as="span" color="primary.500">
          {t.card_info.title_color}
        </Text>
      </Text>
      <Text
        position="relative"
        fontSize="24px"
        mt="1rem"
        color="gray.600"
        d={['none', 'flex']}
      >
        {t.card_info.subtitle}
      </Text>
      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="100%"
        pt={12}
      >
        <Box
          display="flex"
          justifyContent="start"
          alignItems="stretch"
          bg="transparent"
          borderRadius={'20px'}
          flexDirection={['column', 'row']}
          border={['2px solid', '0px']}
          borderColor={['gray.200', 'transparent']}
          boxShadow={['0', '3px 3px 10px 3px rgba(56,28,100,0.1)']}
        >
          <OldCard
            title={t.card_info.old_title}
            body={t.card_info.old_body}
            listCard={t.card_info.old_list}
          />
          <NewCard
            title={t.card_info.new_title}
            body={t.card_info.new_body}
            listCard={t.card_info.new_list}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Steps
