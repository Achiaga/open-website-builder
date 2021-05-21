import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { PricingCard } from './PricingCard'
import { SubscriptionModal, BusinessSubscriptionModal } from '../modals'
import { useEffect } from 'react'
import { event } from '../../utils/analytics'

const ActionButton = (props) => (
  <Button size="lg" w="full" fontWeight="bold" {...props} />
)

const PricingCards = () => {
  const {
    isOpen: isProOpen,
    onOpen: onProOpen,
    onClose: onProClose,
  } = useDisclosure()
  const {
    isOpen: isBusinessOpen,
    onOpen: onBusinessOpen,
    onClose: onBusinessClose,
  } = useDisclosure()

  useEffect(() => {
    event({
      action: 'business_price',
      category: 'payments',
      label: 'click price business modal',
    })
  }, [isBusinessOpen])

  useEffect(() => {
    event({
      action: 'pro_price',
      category: 'payments',
      label: 'click price pro modal',
    })
  }, [isProOpen])

  return (
    <>
      <Box
        d="grid"
        gridTemplateColumns={'repeat( auto-fit, minmax(320px, 1fr))'}
        gridColumnGap="1rem"
        justifyItems="center"
        alignItems="center"
        px={[3, '3rem']}
        pb="4rem"
      >
        <PricingCard
          data={{
            price: 0,
            name: 'Starter',
            description: 'For individuals and teams getting started.',
            subHeader: 'Includes',
            features: ['1 Portfolio', 'Unlimited blocks'],
          }}
          button={
            <ActionButton variant="outline" colorScheme="primary">
              Get started
            </ActionButton>
          }
        />
        <PricingCard
          zIndex={1}
          isPopular
          data={{
            price: 10,
            name: 'Pro',
            description: 'For power users and small teams',
            subHeader: 'Everything in Starter, plus',
            features: [
              'Unlimited portfolios',
              'Animations',
              'Upload images',
              'No watermark',
              'Integrations',
              'Contact forms',
              'Premiun Templates',
              'SEO',
            ],
          }}
          button={
            <ActionButton colorScheme="primary" onClick={onProOpen}>
              Get started
            </ActionButton>
          }
        />
        <PricingCard
          data={{
            price: 60,
            name: 'Enterprise',
            description:
              'Have custom requirements, or want to offer Antfolio to your clients?',
            subHeader: 'Coming soon',
            features: [
              'Custom Integrations',
              'Dedicated designer',
              'Dedicated marketing specialist',
              'Advance SEO',
            ],
          }}
          button={
            <ActionButton
              variant="outline"
              colorScheme="primary"
              onClick={onBusinessOpen}
            >
              Contact us
            </ActionButton>
          }
        />
      </Box>
      <SubscriptionModal
        onOpen={onProOpen}
        toggleModalOpen={onProClose}
        isModalOpen={isProOpen}
      />
      <BusinessSubscriptionModal
        onOpen={onBusinessOpen}
        toggleModalOpen={onBusinessClose}
        isModalOpen={isBusinessOpen}
      />
    </>
  )
}

export default PricingCards
