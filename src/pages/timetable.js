import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';

const Timetable = ({ data }) => (
  <Layout>
    <div className="container">
      <h1>Timetable</h1>

      {data.allMarkdownRemark.edges.map((news, id) => (
        <div key={id}>
          <h3>{news.node.frontmatter.title}</h3>
          <span>Created on: {news.node.frontmatter.date}</span>
          <div dangerouslySetInnerHTML={{ __html: news.node.excerpt }} />
          <Link to={news.node.fields.slug}>Read more</Link>
          <br />
          <hr />
        </div>
      ))}
    </div>
  </Layout>
);

export default Timetable;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { category: { eq: "news" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 100
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
        }
      }
    }
  }
`;
