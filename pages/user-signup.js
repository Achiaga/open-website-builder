import Head from 'next/head'

import { Box } from '@chakra-ui/react'

const SignupPage = () => {
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
        <title>Standout Resume</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Box>
  )
}

export default SignupPage
