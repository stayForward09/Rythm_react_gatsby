import React, { Component } from 'react';
import propTypes from 'prop-types';

import { Hero } from '../components/Hero';
import { Homepage } from '../components/Homepage';
import { MedalCollection } from '../components/MedalCollection';
import { LatestNews } from '../components/LatestNews';
import { Disciplines } from '../components/Disciplines';
import { Map } from '../components/Map';
import { ContactUs } from '../components/ContactUs';
import { Footer } from '../components/Footer';

import Layout from '../components/layout';
import { graphql } from 'gatsby';

const windowGlobal = typeof window !== 'undefined' && window;

const IndexPage = ({ data, apiKey, height, zoom, ready, onReady }) => (
  <div className={`App ${ready ? 'ready' : ''}`}>
    <Hero onReady={onReady} />
    <section className="Home__content">
      {data.home && data.home.edges.map(edge => <Homepage key={edge.node.id} node={edge.node} />)}

      <MedalCollection data={data.medals.edges[0].node.frontmatter} />

      <LatestNews edges={data.news.edges} />

      <Disciplines disciplines={data.disciplines} />

      {onReady && (
        <Map
          isMarkerShown
          zoom={zoom}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `${height}px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      )}

      <ContactUs />

      <Footer
        disciplines={data.disciplines.edges}
        legals={data.legals.edges}
        socials={data.socials.edges}
      />
    </section>
  </div>
);

IndexPage.propTypes = {
  data: propTypes.any.isRequired,
  apiKey: propTypes.string.isRequired,
  height: propTypes.number.isRequired,
  zoom: propTypes.number.isRequired,
  onReady: propTypes.func.isRequired,
};

class Index extends Component {
  constructor(props) {
    super(props);

    const { zoom, height } = this.calculateZoomLevel();

    this.state = {
      zoom,
      height,
    };
  }

  calculateZoomLevel() {
    const zoom = windowGlobal.innerWidth <= 600 ? 11 : windowGlobal.innerWidth <= 1100 ? 12 : 13;
    const height = windowGlobal.innerHeight < 800 ? windowGlobal.innerHeight + 100 : 900;

    return {
      zoom,
      height,
      ready: false,
    };
  }

  onReady = () => {
    this.setState({ ready: true });
  };

  render() {
    const { data, location } = this.props;
    const { ready, zoom, height } = this.state;

    return (
      <Layout location={location}>
        <IndexPage
          data={data}
          apiKey="AIzaSyBSTxTuLLnTs7oRrOAC8vUBHBmcKVW06Wo"
          height={height}
          zoom={zoom}
          ready={ready}
          onReady={this.onReady}
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
