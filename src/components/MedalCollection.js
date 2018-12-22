import React, { PureComponent } from 'react';
import { Link } from 'gatsby';

import './MedalCollection.css';

export class MedalCollection extends PureComponent {
  render() {
    const { data } = this.props;

    const totalMedals = data.gold + data.silver + data.bronze;

    return (
      <div className="MedalCollection">
        <h2 className="title">{data.title}</h2>

        <Link to="medals" className="MedalCollection__medals__container">
          <div className="MedalCollection__medals">
            <img className="logo" src="/img/medal.png" alt="Medal" width="300px" />
            <span className="MedalCollection__medals__counter">{totalMedals}</span>
          </div>
        </Link>
      </div>
    );
  }
}
