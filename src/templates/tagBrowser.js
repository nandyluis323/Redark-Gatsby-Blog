import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../layout/layout'
import SEO from '../components/seo'
import Pagination from '../components/pagination'
import PostBlock from '../components/postBlock'
import AdSenseInArticle from '../typography/adSenseInArticle'
import siteConfig from '../site-config.json'

const PostBrowser = ({data, pageContext}) => {
  return(
    <Layout>
      <SEO title={`Tag: ${pageContext.tag}`}/>
      <h1>{`Tag: ${pageContext.tag}`}</h1>
      {
        data.allMdx.nodes.map(({ frontmatter: { slug, image, title, date, categories } }, index) => (
          <React.Fragment key={slug}>
            {siteConfig.adSense.inTagBrowser && index === Math.round(data.allMdx.nodes.length * 0.75) && <AdSenseInArticle/>}
            <PostBlock key={slug}
                       slug={slug}
                       image={image.childImageSharp.fluid}
                       title={title}
                       date={date}
                       categories={categories} />
          </React.Fragment>
        ))
      }
      <Pagination link={pageContext.paginationLink}
                  current={pageContext.currentPage}
                  max={pageContext.numPages}/>
    </Layout>
  )
}

export const blogListQuery = graphql`
  query postListByTagQuery($skip: Int!, $limit: Int!, $tag: String) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: {
        frontmatter: {
          tags: { in: [$tag] }
        }
      }
    ) {
      nodes {
        frontmatter {
          title
          slug
          date
          categories
          image {
            childImageSharp {
              fluid(maxWidth: 800, maxHeight: 370, quality: 90) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`

export default PostBrowser
