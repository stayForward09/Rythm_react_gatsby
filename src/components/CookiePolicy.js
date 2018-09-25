import React, { Component } from 'react';
import { Link } from 'gatsby';
import propTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import './CookiePolicy.css';

class CookiePolicyComponent extends Component {
  static propTypes = {
    cookies: propTypes.instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    const { cookies } = props;

    this.state = {
      acceptedCookies: cookies.get('Accepted_cookies') || false,
    };

    this.onAccept = this.onAccept.bind(this);
  }

  onAccept() {
    const { cookies } = this.props;
    cookies.set('Accepted_cookies', true, { path: '/' });
    this.setState({ fadeOut: true });

    setTimeout(() => this.setState({ acceptedCookies: true }), 1000);
  }

  render() {
    return (
      this.state &&
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

export const CookiePolicy = withCookies(CookiePolicyComponent);
