import React, { Component } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import './CookiePolicy.css';

class CookiePolicyComponent extends Component {
  constructor() {
    super();

    this.state = {
      acceptedCookies: true,
    };

    this.onAccept = this.onAccept.bind(this);
  }

  componentDidMount() {
    const { cookies } = this.props;

    this.setState({
      acceptedCookies: !!cookies.get('Accepted_cookies'),
      fadeOut: false,
    });
  }

  onAccept() {
    const { cookies } = this.props;

    this.setState({ fadeOut: true });

    setTimeout(() => {
      cookies.set('Accepted_cookies', true, { path: '/' });
      this.setState({ acceptedCookies: true });
    }, 1000);
  }

  render() {
    return (
      this.state.acceptedCookies === false && (
        <div className={`CookiePolicy${this.state.fadeOut ? ' fade-out' : ''}`}>
          <div className="CookiePolicy__notification">
            <div className="CookiePolicy__notification__content">
              <div className="CookiePolicy__notification__content__copy">
                <p className="CookiePolicy__copy">
                  To ensure the best experience on our website, we recommend that you allow cookies,
                  as described in our <Link to="/legal/cookies">Cookie Policy</Link>.
                </p>
                <p className="actions">
                  <button
                    type="button"
                    className="button large light primary accept-cookies"
                    onClick={this.onAccept}
                  >
                    Got it
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

CookiePolicyComponent.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export const CookiePolicy = withCookies(CookiePolicyComponent);
