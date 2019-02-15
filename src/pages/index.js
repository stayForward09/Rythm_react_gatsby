import React, { Component } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { IndexPage } from '../components/indexPage';

const windowGlobal = typeof window !== 'undefined' && window;
const zoom = windowGlobal.innerWidth <= 600 ? 11 : windowGlobal.innerWidth <= 1100 ? 12 : 13;
const height = windowGlobal.innerHeight < 800 ? windowGlobal.innerHeight + 100 : 900;

class Index extends Component {
  state = {
    zoom,
    height,
  };

  render() {
    const { data, location } = this.props;
    const { zoom, height } = this.state;

    return (
      <Layout location={location}>
        <IndexPage
          data={data}
          apiKey="AIzaSyBSTxTuLLnTs7oRrOAC8vUBHBmcKVW06Wo"
          height={height}
          zoom={zoom}
        />
      </Layout>
    );
  }
}

export default Index;

export const pageQuery = graphql`
  {
    disciplines: allMarkdownRemark(
      filter: { fields: { category: { eq: "discipline" } } }
      sort: { fields: [frontmatter___position], order: ASC }
      limit: 10
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    home: allMarkdownRemark(filter: { fields: { category: { eq: "home" } } }, limit: 1) {
      edges {
        node {
          id
          html
          frontmatter {
            title
          }
        }
      }
    }
    news: allMarkdownRemark(
      filter: { fields: { category: { eq: "news" } } }
      limit: 10
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM Do, YYYY")
            title
          }
        }
      }
    }
    medals: allMarkdownRemark(filter: {fields: {category: {eq: "medals"}}}) {
      edges {
        node {
          frontmatter {
            title
            gold
            bronze
            silver
          }
        }
      }
    }
    legals: allMarkdownRemark(
      filter: { fields: { category: { eq: "legal" } } }
      sort: { fields: [frontmatter___position], order: ASC }
      limit: 10
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    socials: allMarkdownRemark(
      filter: { fields: { category: { eq: "socials" } } }
      sort: { fields: [frontmatter___position], order: ASC }
      limit: 10
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            position
            icon
            link
          }
        }
      }
    }
  }
`;
