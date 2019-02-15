import React, { PureComponent } from 'react';
import propTypes from 'prop-types';

import { Hero } from './Hero';
import { Homepage } from './Homepage';
import { MedalCollection } from './MedalCollection';
import { LatestNews } from './LatestNews';
import { Disciplines } from './Disciplines';
import { Map } from './Map';
import { ContactUs } from './ContactUs';
import { Footer } from './Footer';

export class IndexPage extends PureComponent {
    state = {
      ready: false
    }

    render() {
      const { data, apiKey, height, zoom } = this.props;
      const { ready } = this.state;

      return (
        <div className={`App ${ready ? 'ready' : ''}`}>
        <Hero image="/img/rhythmicexcellence.png" alt="rhythmicexcellence" handleImageLoaded={this.handleImageLoaded} />
        <section className="Home__content">
          {data.home && data.home.edges.map(edge => <Homepage key={edge.node.id} node={edge.node} />)}

          <MedalCollection data={data.medals.edges[0].node.frontmatter} />

          <LatestNews edges={data.news.edges} />

          <Disciplines disciplines={data.disciplines} />

          { ready && <Map
            isMarkerShown
            zoom={zoom}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `${height}px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />}

          <ContactUs />

          <Footer
            disciplines={data.disciplines.edges}
            legals={data.legals.edges}
            socials={data.socials.edges}
          />
        </section>
      </div>
      )
    }

    handleImageLoaded = () => {
      setTimeout(() => this.setState({ ready: true }));
    }
  }

  IndexPage.propTypes = {
    data: propTypes.any.isRequired,
    apiKey: propTypes.string.isRequired,
    height: propTypes.number.isRequired,
    zoom: propTypes.number.isRequired,
  };
