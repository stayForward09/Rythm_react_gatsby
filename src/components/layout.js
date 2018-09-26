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
          socials: allMarkdownRemark(
            filter: { fields: { category: { eq: "socials" } } }
            sort: { fields: [frontmatter___position], order: ASC }
            limit: 10
          ) {
            edges {
              node {
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
      `}
      render={data => (
        <>
          <Helmet
            title={data.siteTitle.siteMetadata.title}
            meta={[
              { name: 'description', content: 'Rhythmic Gymnastic School in London' },
              {
                name: 'keywords',
                content:
                  'Rhythmic, Gymnastic, London, Rhythmic Gymnastic School, Rhythmic Gymnastic School in London, School in London, Rhythmic Gymnastic, Gymnastic School',
              },
              { name: 'author', content: 'RhythmicExcellence' },
              { name: 'generator', content: 'RhythmicExcellence' },
              { name: 'revisit-after', content: '1 month' },
            ]}
          >
            <html lang="en" />
          </Helmet>
          <main>
            <Navbar />
            {!isHomepage && <Topbar />}
            {children}
            {!isHomepage && (
              <Footer
                disciplines={data.disciplines.edges}
                legals={data.legals.edges}
                socials={data.socials.edges}
              />
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
