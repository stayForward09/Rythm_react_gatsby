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
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Helmet
            title={data.site.siteMetadata.title}
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
            {!isHomepage && <Footer />}
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
