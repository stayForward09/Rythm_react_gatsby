import React, { PureComponent } from 'react';
import { graphql } from 'gatsby';

import Layout from '../layouts/index';

import './medals.css';

class Medals extends PureComponent {
  render() {
    const { data } = this.props;
    const { frontmatter } = data.allMarkdownRemark.edges[0].node;

    return (
      <Layout>
        <div className="container">
          <div className="medals">
            <h1>{frontmatter.title}</h1>

            <div className="medals__container">
              <div className="medals__container__column">
                <h3>{frontmatter.silver}</h3>
                <div className="base base__1">
                  <img
                    className="medal__img medal__1__img"
                    src="/img/medal_silver.png"
                    alt="Silver Medals"
                  />
                </div>
              </div>

              <div className="medals__container__column">
                <h3>{frontmatter.gold}</h3>
                <div className="base base__2">
                  <img
                    className="medal__img medal__2__img"
                    src="/img/medal_gold.png"
                    alt="Gold Medals"
                  />
                </div>
              </div>

              <div className="medals__container__column">
                <h3>{frontmatter.bronze}</h3>
                <div className="base base__3">
                  <img
                    className="medal__img medal__3__img"
                    src="/img/medal_bronze.png"
                    alt="Bronze Medals"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Medals;

export const pageQuery = graphql`
  {
    allMarkdownRemark(filter: { fields: { category: { eq: "medals" } } }, limit: 1) {
      edges {
        node {
          frontmatter {
            title
            gold
            silver
            bronze
          }
        }
      }
    }
  }
`;
