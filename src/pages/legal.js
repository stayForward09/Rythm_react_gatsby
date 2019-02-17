import React from 'react';
import { Link, graphql } from 'gatsby';

const Legal = ({ data }) => (
  <div className="container">
    <h1>Legal</h1>

    {data.allMarkdownRemark.edges.map((legal, id) => (
      <div key={id}>
        <h3>{legal.node.frontmatter.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: legal.node.excerpt }} />
        <Link to={legal.node.fields.slug}>Read more</Link>
        <br />
        <hr />
      </div>
    ))}
  </div>
);

export default Legal;

export const pageQuery = graphql`
  {
    allMarkdownRemark(filter: { fields: { category: { eq: "legal" } } }, limit: 100) {
      edges {
        node {
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
  }
`;
