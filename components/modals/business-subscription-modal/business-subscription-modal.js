import { useState } from 'react'
import {
  Box,
  Text,
  Input,
  Spinner,
  ListItem,
  ListIcon,
  List,
} from '@chakra-ui/react'
import { ModalContent, ModalCloseButton } from '@chakra-ui/react'

import Modal from '../../modal'
import Button from '../../commun/button'

import { event } from '../../../utils/analytics'
import { useTranslation } from '../../../hooks/translation'
import { addUserToBetaList } from '../../../helpers/transport'
import LogoSvg from '../../../assets/logo'
import { MdCheckCircle } from 'react-icons/md'
import { BUSINESS } from '../../../constants'

const LeftSideContent = () => {
  const [t] = useTranslation()
  return (
    <Box
      borderRadius={['0px', '12px']}
      w={['100%', '70%']}
      p={[2, 8]}
      px={[6, 12]}
      fontSize="md"
      fontWeight="normal"
      fontFamily="Montserrat"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <ModalCloseButton />
      <Text
        as="h1"
        color="primary.500"
        pt={[4, 2]}
        fontSize="2xl"
        fontWeight="medium"
        textAlign="center"
      >
        {t.business_subscription_modal.header}
      </Text>
      <Text as="p" lineHeight="25px" py={['1rem', '3rem']} fontSize="lg">
        {t.business_subscription_modal.body_1}
        <br />
        <br />
        <List spacing={3}>
          <ListItem color="gray.500">
            <ListIcon as={MdCheckCircle} color="green.500" />
            {t.business_subscription_modal.listItem1}
          </ListItem>
          <ListItem color="gray.500">
            <ListIcon as={MdCheckCircle} color="green.500" />
            {t.business_subscription_modal.listItem2}
          </ListItem>
        </List>
        <br />
        {t.business_subscription_modal.body_1_1}
        <br />
        <br />
        {t.business_subscription_modal.body_2}
        <br />
        <br />
        {t.business_subscription_modal.body_3}
        <br />
        <br />
      </Text>

      <Text fontWeight="medium" as="p" fontSize="sm" textAlign="center">
        <Text as="span" color="primary.500">
          {t.business_subscription_modal.footer_color_1}
        </Text>
        {t.business_subscription_modal.footer}
        <Text as="span" color="primary.500">
          {t.business_subscription_modal.footer_color_2}
        </Text>
      </Text>
    </Box>
  )
}

const RightSideContent = () => {
  const [t] = useTranslation()
  const [emailValue, setEmailValue] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleEmail = (e) => {
    const { value } = e.target
    setEmailValue(value)
    setIsSuccess(false)
  }

  const handleSubmitEmail = (e) => {
    e.preventDefault()
    if (isLoading || !emailValue) return
    setIsLoading(true)
    event({
      action: 'enterprise price',
      params: {
        search_term: 'enter email',
      },
    })
    addUserToBetaList(emailValue, BUSINESS)
      .then((value) => {
        if (value === 'success') {
          setIsSuccess(true)
          setEmailValue('')
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <Box
      width={['100%', '50%']}
      borderRadius={['0px', '0 12px 12px 0']}
      p={[8, 4]}
      px={[5, 10]}
      bg="primary.100"
      fontSize="lg"
      fontWeight="semibold"
      fontFamily="Montserrat"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box marginTop={'-6rem'} paddingY={'2rem'} display={['none', 'block']}>
        <LogoSvg />
      </Box>
      <Text as="h1" textAlign="center" lineHeight="24px" d={['none', 'block']}>
        {t.business_subscription_modal.join}
        <Text as="span" color="primary.500" ml="4px">
          {t.business_subscription_modal.join_color}
        </Text>
      </Text>

      <Box
        as="form"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        w="100%"
        onSubmit={handleSubmitEmail}
      >
        <Input
          my={6}
          mt={[2, 8]}
          border="none"
          bg="white"
          fontSize="sm"
          placeholder={t.business_subscription_modal.email_subscription}
          type="email"
          id="email"
          value={emailValue}
          onChange={handleEmail}
        />
        <Button
          type="submit"
          h={10}
          minW="7.5rem"
          fontSize="md"
          fontWeight="semibold"
          bg={isSuccess ? 'green.500' : 'primary.500'}
          _hover={{ bg: `${isSuccess ? 'green.500' : 'primary.500'}` }}
          _active={{
            bg: `${isSuccess ? 'green.500' : 'primary.500'}`,
            transform: 'scale(0.98)',
            borderColor: '#bec3c9',
          }}
        >
          {isLoading ? (
            <Spinner />
          ) : isSuccess ? (
            t.button_success
          ) : (
            t.business_subscription_modal.access
          )}
        </Button>
        <Text
          as="span"
          color="primary.500"
          textAlign="center"
          ml={[0, '4px']}
          fontSize="sm"
          mb={[0, '-3rem']}
          mt={['1rem', '1rem']}
          fontWeight="400"
        >
          💌 {t.business_subscription_modal.noSpam}
        </Text>
      </Box>
    </Box>
  )
}

const BusinessSubscriptionModal = ({ isModalOpen, toggleModalOpen }) => {
  return (
    <Modal isOpen={isModalOpen} onClose={toggleModalOpen}>
      <ModalContent
        bg="white"
        maxW={['90vw', '60rem']}
        h={['auto', '95%']}
        overflow="scroll"
        m="auto"
        borderRadius={['6px', '12px']}
        display="flex"
        flexDir={['column', 'row']}
        justifyContent="center"
        alignItems="stretch"
      >
        <LeftSideContent />
        <RightSideContent />
      </ModalContent>
    </Modal>
  )
}

export default BusinessSubscriptionModal
