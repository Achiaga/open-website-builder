const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
  env: {
    JEXIA_PROJECT_ID: process.env.JEXIA_PROJECT_ID,
    JEXIA_KEY: process.env.JEXIA_KEY,
    JEXIA_SECRET: process.env.JEXIA_SECRET,
    JEXIA_ZONE: process.env.JEXIA_ZONE,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'www.vectary.com',
      'antfolio.s3.amazonaws.com',
    ],
  },
})
