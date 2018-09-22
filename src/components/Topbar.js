import React, { Component } from 'react';
import { Link } from 'gatsby';

import './Topbar.css';

export class Topbar extends Component {
  render() {
    return (
      <div className="Topbar">
        <h1>
          <Link className="home" exact="true" to="/">
            Rhythmic Excellence
          </Link>
        </h1>
      </div>
    );
  }
}
