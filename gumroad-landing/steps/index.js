import { Box, Text } from '@chakra-ui/layout'
import { useTranslation } from '../../hooks/translation'

import Card from './card'

const Steps = () => {
  const [t] = useTranslation()

  return (
    <Box
      color="gray.500"
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
        width={['auto', 'auto', '50rem']}
        px={['0', '6rem']}
      >
        Testimonials
      </Text>
      <Box
        position="relative"
        display="grid"
        gridTemplateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr']}
        gridRowGap="1rem"
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
          body={
            "Add your product info, we will guide you throughout the process so don't worry, it will be fun."
          }
          subBody={
            "You don't like this part, we don't either. That is why we have invested a lot of time to make it easy and fun. You will never want to go back to the old way of creating websites."
          }
        />
        <Card
          step={t.steps.step_3}
          title={t.steps.step_3_title}
          body={
            'Congrats, you have finished your website. Add your domain and hit the publish button! That is it. Your website is live 😀'
          }
        />
      </Box>
    </Box>
  )
}

export default Steps
