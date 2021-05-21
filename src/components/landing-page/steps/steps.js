import { Box, Text } from '@chakra-ui/react'
import { useTranslation } from '../../../../hooks/translation'

import Card from './card'

const Steps = () => {
  const [t] = useTranslation()

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      marginTop="3rem"
      marginBottom={['2rem', '12rem']}
    >
      <Text
        position="relative"
        fontWeight="bold"
        color="primary.500"
        textAlign="center"
        fontFamily="Montserrat"
        fontSize={['2.5rem', '50px']}
        lineHeight={['3rem', '4rem']}
        paddingX={['0.75rem', '0']}
        width={['auto', '50rem']}
        px={['0', '6rem']}
      >
        {t.steps.title}
      </Text>
      <Box
        position="relative"
        display="grid"
        gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}
        alignItems="center"
        width="100%"
        paddingTop={['2rem', '5rem']}
        px={0}
        flexDir={['column', 'row']}
      >
        <Card
          step={t.steps.step_1}
          title={t.steps.step_1_title}
          body={t.steps.step_1_body}
        />
        <Card
          step={t.steps.step_2}
          title={t.steps.step_2_title}
          body={t.steps.step_2_body}
          subbody={t.steps.step_2_body_2}
        />
        <Card
          step={t.steps.step_3}
          title={t.steps.step_3_title}
          body={t.steps.step_3_body}
        />
      </Box>
    </Box>
  )
}

export default Steps
