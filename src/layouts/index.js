import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql, withPrefix } from 'gatsby';
import { CookiesProvider } from 'react-cookie';

import '../reset.css';
import '../colors.css';
import '../buttons.css';
import './layout.css';

import { Topbar } from '../components/Topbar';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CookiePolicy } from '../components/CookiePolicy';
import { SWBanner } from '../components/SWBanner';

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
              { name: 'google-site-verification' content: 'AAmXSywWoYgij0Q_FPRmupBM2ev1Mm_5BCs0_Y1TXms' },
            ]}
          >
            <html lang="en" />
          </Helmet>
          <CookiesProvider>
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
            <SWBanner />
          </CookiesProvider>
        </>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
