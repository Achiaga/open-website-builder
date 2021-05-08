import { Box, HStack, Image } from '@chakra-ui/react'

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
  TLDR,
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
        <Box px={['1.5rem', '10rem']} zIndex="1" pb="10rem">
          <ArticleDate>May 6, 2021</ArticleDate>
          <Header>Alternative to Carrd</Header>
          <ContentWrapper>
            <Description>
              Carrd is a very popular website builder to create simple pages and
              it is really good at doing that, but that doesn’t mean it’s right
              for everyone.
            </Description>
            <Subtitle>What is carrd good for?</Subtitle>
            <TLDR
              items={[
                'Simple pages with not a lot of customization',
                'Creating websites fast',
                'People who need to get something out fast without thinking too much on design',
              ]}
            />
            <Paragraph>
              Whether you’re looking for alternatives for your new site, or want
              to switch from Carrd to something different, you’re in the right
              place! We know the market and we know the competitors inside out.
            </Paragraph>
            <Paragraph>
              We have tested dozens of websites and portfolio builders so you
              don&apos;t have to.
            </Paragraph>
            <Paragraph>Here are the alternatives:</Paragraph>

            <Box>
              <Subtitle>
                <b>
                  <a href="https://antfolio.app/">Antfolio: </a>
                </b>
                Best alternative overall
              </Subtitle>
              <Paragraph>
                Antfolio is the closest builder to carrd in terms on
                functionality and ease of use. It allows you
                <HStack spacing="24px" my="1rem">
                  <Image src="/features_template.png" w="50%" />
                  <Image src="/features_template.png" w="50%" />
                </HStack>
                <Paragraph>
                  Antfolio allows users to create highly customizable websites
                  in minutes. It uses a simple drag and drop builder. What makes
                  Antfolio unique is how their builder work. It allows you to
                  positions items anywhere on the page resize them and create
                  amazing layouts. It also offers a high variety of 3D
                  illustrations and icons.
                </Paragraph>
                <Paragraph>
                  <b>Main differences</b>
                </Paragraph>
                <Paragraph>
                  The builder is the biggest differentiator. Card has a fixed
                  layout that you can customize with a variety of blocks (
                  buttons, images, forms ...). Antfolio offers a builder with no
                  fixed layout, this means you can positions blocks anywhere on
                  the page and create the layouts you want without any
                  constrains. This allows users to be much more creative with
                  their design.
                </Paragraph>
              </Paragraph>
            </Box>
          </ContentWrapper>
        </Box>
        <ComparisonTable />
      </Box>
    </>
  )
}

export default Article2
