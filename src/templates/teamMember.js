import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/index';

import './teamMember.css';

const NewsPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <div className="container">
        <img
          className="teamMember__avatar"
          src={post.frontmatter.avatar}
          alt={post.frontmatter.title}
        />
        <h2 className="teamMember__title">{post.frontmatter.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.frontmatter.details }} />
      </div>
    </Layout>
  );
};

export default NewsPost;

export const postQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        avatar
        details
      }
    }
  }
`;
