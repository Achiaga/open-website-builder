import Head from 'next/head'

export function hasFlurlyLink(stringifyBlocks) {
  return stringifyBlocks.includes('https://flurly.com')
}
export function hasGumroadLink(stringifyBlocks) {
  return (
    stringifyBlocks.includes('https://gumroad.com') ||
    stringifyBlocks.includes('https://gum.co/')
  )
}

const FlurlyExtension = (
  <>
    <script async src="https://js.stripe.com/v3/"></script>
    <script async src="https://flurly.com/flurly-checkout.js"></script>
  </>
)

const GumroadExtension = (
  <script async src="https://gumroad.com/js/gumroad.js"></script>
)

const ECommerceExtensions = (blocks) => {
  const stringifyBlocks = JSON.stringify(blocks)
  const hasFlurly = hasFlurlyLink(stringifyBlocks)
  const hasGumroad = hasGumroadLink(stringifyBlocks)
  return (
    <Head>
      {hasFlurly && FlurlyExtension}
      {hasGumroad && GumroadExtension}
    </Head>
  )
}

export default ECommerceExtensions
