import Head from 'next/head'

import { Builder } from '../builder'

const BuilderPage = () => {
  return (
    <>
      <Head>
        <title>Antfolio - Builder</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.antfolio.app/builder" />
      </Head>
      <Builder />
    </>
  )
}

export default BuilderPage
