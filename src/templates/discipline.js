import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

const DisciplinePage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <div className="container">
        <h2>{post.frontmatter.title}</h2>
        <p>{post.frontmatter.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
};

export default DisciplinePage;

export const disciplineQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        title
      }
    }
  }
`;
