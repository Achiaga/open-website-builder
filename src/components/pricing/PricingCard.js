import {
  Box,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react'
import * as React from 'react'
import { GoCheck } from 'react-icons/go'
import { Card } from './Card'

export const PricingCard = (props) => {
  const { data, button, ...rest } = props
  const { features, price, name, description, subHeader } = data

  return (
    <Card
      rounded={{ sm: 'xl' }}
      {...rest}
      color="gray.500"
      mb="2rem"
      w={'100%'}
      borderRadius={'0.75rem'}
    >
      <VStack spacing={6}>
        <Heading size="2xl" fontWeight="bold">
          {name}
        </Heading>
      </VStack>
      <Box
        d="flex"
        justifyContent="center"
        height={['auto', '120px']}
        alignItems="center"
      >
        <Text
          fontSize="lg"
          textAlign="center"
          fontWeight="300"
          py="1rem"
          wordBreak="break-word"
          width={['auto', '220px']}
        >
          {description}
        </Text>
      </Box>
      <Flex
        align="flex-end"
        justify="center"
        fontWeight="extrabold"
        my={['6', '8']}
        pos="relative"
        pl={['5rem', '0']}
      >
        <Heading
          size="3xl"
          fontWeight="inherit"
          lineHeight="0.9em"
          color="primary.500"
          pos="relative"
        >
          {price}
          <Text
            fontSize="2xl"
            pos="absolute"
            left="0"
            top="0"
            color="gray.500"
            transform="translate(-150%,-30%)"
          >
            $
          </Text>
        </Heading>
        <Text
          fontSize="md"
          pos={['relative', 'absolute']}
          pl={['1rem', '0']}
          right="0"
        >
          {price ? '/ month' : 'free forever'}
        </Text>
      </Flex>
      <List spacing="4" mb="8" maxW="28ch" mx="auto" height={['auto', '300px']}>
        <Text fontSize="xl" mb="1rem" color="gray.500" fontWeight="600">
          {subHeader}
        </Text>
        {features.map((feature, index) => (
          <ListItem fontWeight="300" key={index}>
            <ListIcon
              fontSize="xl"
              as={GoCheck}
              marginEnd={2}
              color="primary.500"
              mr="1rem"
            />
            {feature}
          </ListItem>
        ))}
      </List>
      {button}
    </Card>
  )
}
