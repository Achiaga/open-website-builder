import Head from 'next/head'
import { useState } from 'react'

import { Box } from '@chakra-ui/react'

import { AnalyticsEvent } from '../../utils/analytics'
import { initLiveChatScript } from '../../utils/analytics'

import { SubscriptionModal } from '../modals'
import Navbar from '../navbar'
import Hero from '../hero'
import Comparison from '../comparison'
import Features from '../features'
import Steps from '../steps'
import CardInfo from '../card-info'
import Footer from '../footer'

const LandingPage = () => {
  const [isModalOpen, toggleModalOpen] = useState(false)

  const handleFreeTrial = () => {
    toggleModalOpen(true)
    AnalyticsEvent('Modal Opened', 'clicked')
  }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      maxWidth="100vw"
    >
      <Head>
        <meta
          name="google-site-verification"
          content="UadvCpBK-LYrfPuloDtGWCqlJeQKDZUy3XtQH0wOZ8E"
        />
        <title>Antfolio - Build your online portfolio/resume</title>
        <link rel="icon" href="/favicon.ico" />
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: initLiveChatScript,
          }}
        />
      </Head>

      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="start"
        alignItems="center"
        w="full"
      >
        {isModalOpen && (
          <SubscriptionModal
            isModalOpen={isModalOpen}
            toggleModalOpen={toggleModalOpen}
          />
        )}
        <Navbar handleFreeTrial={handleFreeTrial} />
        <Hero handleFreeTrial={handleFreeTrial} />
        <Comparison />
        <Features handleFreeTrial={handleFreeTrial} />
        <Steps />
        <CardInfo />
        <Footer />
      </Box>
    </Box>
  )
}

export default LandingPage
