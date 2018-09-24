import React from 'react';
import { Link } from 'gatsby';

import './CookiePolicy.css';

export const CookiePolicy = () => {
  return (
    <div className="CookiePolicy">
      <div className="CookiePolicy__notification">
        <div className="CookiePolicy__notification__content">
          <div className="CookiePolicy__notification__content__copy">
            <p className="CookiePolicy__copy">
              To ensure the best experience on our website, we recommend that you allow cookies, as
              described in our <Link to="/legal/cookies">Cookie Policy</Link>.
            </p>
            <p className="actions">
              <button type="button" className="button large light primary accept-cookies">
                Got it
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
