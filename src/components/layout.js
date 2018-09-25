import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql, withPrefix } from 'gatsby';

import '../reset.css';
import '../colors.css';
import '../buttons.css';
import './layout.css';

import { Topbar } from '../components/Topbar';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CookiePolicy } from './CookiePolicy';

const Layout = ({ children, location }) => {
  const isHomepage = location && location.pathname === withPrefix('/');

  return (
    <StaticQuery
      query={graphql`
        {
          siteTitle: site {
            siteMetadata {
              title
            }
          }
          disciplines: allMarkdownRemark(
            filter: { fields: { category: { eq: "discipline" } } }
            sort: { fields: [frontmatter___position], order: ASC }
            limit: 10
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
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
      `}
      render={data => (
        <>
          <Helmet
            title={data.siteTitle.siteMetadata.title}
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          >
            <html lang="en" />
          </Helmet>
          <main>
            <Navbar />
            {!isHomepage && <Topbar />}
            {children}
            {!isHomepage && (
              <Footer disciplines={data.disciplines.edges} legals={data.legals.edges} />
            )}
          </main>
          <CookiePolicy />
        </>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
