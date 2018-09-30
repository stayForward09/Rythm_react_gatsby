import React, { Component } from 'react';
import { Link } from 'gatsby';
import propTypes from 'prop-types';

import './Hero.css';

const HeroWrapper = defaultState => WrappedComponent => {
  return class HeroeWrapperComponent extends Component {
    constructor() {
      super();
      this.state = { show: defaultState };
      this.handleImageLoaded = this.handleImageLoaded.bind(this);
    }

    handleImageLoaded() {
      this.setState({ show: true });
      setTimeout(() => this.props.onReady());
    }

    render() {
      return (
        <WrappedComponent
          {...this.state}
          image="/img/rhythmicexcellence.png"
          alt="rhythmicexcellence"
          handleImageLoaded={this.handleImageLoaded}
        />
      );
    }
  };
};

HeroWrapper.propTypes = {
  onReady: propTypes.bool.isRequired,
};

class HeroComponent extends Component {
  image = React.createRef();

  componentDidMount() {
    const img = this.image.current;

    if (img && img.complete) {
      this.props.handleImageLoaded();
    }
  }

  render() {
    const { show, image, alt, handleImageLoaded } = this.props;

    return (
      <div className="Hero">
        <div className={'hero-bg ' + (show ? 'show' : '')}>
          <Link className="home-link" exact="true" to="/">
            <h1>Rhythmic Excellence</h1>
          </Link>
          <img
            ref={this.image}
            className={'hero-logo ' + (show ? 'show' : '')}
            src={image}
            alt={alt}
            onLoad={handleImageLoaded}
          />
        </div>
      </div>
    );
  }
}

export const Hero = HeroWrapper(false)(HeroComponent);
