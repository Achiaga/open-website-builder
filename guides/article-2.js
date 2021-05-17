import { Box } from '@chakra-ui/react'

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
                    'Simple and ease to use, website ready in minutes. No learning curve.',
                },
                {
                  title: 'Webflow',
                  link: 'https://webflow.com',
                  description:
                    'Highly customizable everything, steep learning curve.',
                },
                {
                  title: 'Wix',
                  link: 'https://wix.com',
                  description:
                    'Most popular website builder, lots of tools and very good overall.',
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
      </Box>
    </>
  )
}

export default Article2
