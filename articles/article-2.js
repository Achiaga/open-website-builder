import { Box, Text } from '@chakra-ui/react'

import Navbar from '../components/navbar'
import ComparisonTable from './comparison-table'
import {
  ArticleDate,
  BannerImage,
  ContentWrapper,
  Description,
  Header,
  ListWithLinks,
  Paragraph,
  Subtitle,
} from './components'

const Article2 = () => {
  return (
    <>
      <Box>
        <Navbar />
        <Box bg="primary.500">
          <BannerImage
            height={['80vw', '40vw']}
            width={'100vw'}
            redirectUrl="blog/article-1"
            imageUrl="/features_template.png"
          />
        </Box>
        <Box px={['1.5rem', '10rem']} zIndex="1" pb="2rem">
          <ArticleDate>May 6, 2021</ArticleDate>
          <Header>The Top 100 Website Builders</Header>
          <ContentWrapper>
            <Description>
              Even if you don&apos;t know how to code, there&apos;s a website
              builder out there for you, it does not matter if you&apos;re a
              small business owner, designer, photographer, blogger, or
              consultant, we got you cover.
            </Description>
            <ListWithLinks
              title="Our top 3 website builders"
              items={[
                {
                  title: 'Antfolio',
                  link: 'https://antfolio.app',
                  description:
                    'Simple and ease to use. Drag and Drop. No-code. No learning curve. Perfect for Landing Pages and Portfolios. Their best quality, beatiful desgins and easy to customize templates, to make it yours.',
                },
                {
                  title: 'Webflow',
                  link: 'https://webflow.com',
                  description:
                    'Highly customizable everything. Steep learning curve. No-Code + Code. Perfect for startups who needs all their services on the web and can not affords a team of developers. Super powerful tool that allow business to have complex web apps with minimum tech team.',
                },
                {
                  title: 'Umso',
                  link: 'https://www.umso.com/',
                  description:
                    'Quickest website builder on the market. Super simple forms that by choosing options it will automatically build your website. Perfect for user who don not need customazible website and just need a nice looking product fast.',
                },
              ]}
            />

            <Paragraph>
              Gone are the days when you have to be a web developer with coding
              expertise and a lot of time and resources to build an easy,
              professional-looking website. Popular website builders like Wix
              and Weebly make it simple for even a novice to create a polished
              site in a comparatively short time, even when more sophisticated
              features like an e-commerce portal or email marketing are needed.
            </Paragraph>
            <Paragraph>
              Finding the right website designer is dependent on the own needs;
              the process can be daunting due to the abundance of alternatives,
              ranging from free options for a basic website to e-commerce sites
              for a more sophisticated business website. Because of the
              industry's growth and complexity, you have more options than ever
              before, and you can quickly find the right builder suited to you.
            </Paragraph>
            <Paragraph>
              We have tested dozens of websites and portfolio builders so you
              don&apos;t have to.
            </Paragraph>
            <Subtitle>Here are 100 best website builders:</Subtitle>
          </ContentWrapper>
        </Box>
        <ComparisonTable />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          py="2rem"
          mb="5rem"
        >
          <Text as="h2" fontSize="4rem">
            Any Websites Builders We Are Missing?
          </Text>
          <Text as="h2" fontSize="1.5rem" color="gray.500" pt="1rem">
            Send us an email to bender.dev.maker@gmail.com
          </Text>
          <Text as="h2" fontSize="1.2rem" color="gray.500" pt="0.5rem">
            We will add it!
          </Text>
        </Box>
      </Box>
    </>
  )
}

export default Article2
