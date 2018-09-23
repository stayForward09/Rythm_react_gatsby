import React from 'react';
import { Link } from 'gatsby';
import propTypes from 'prop-types';

import './Disciplines.css';

const Discipline = ({ title, link }) => (
  <Link className="Discipline" to={link}>
    <h3>{title}</h3>
  </Link>
);

Discipline.propTypes = {
  title: propTypes.string.isRequired,
  link: propTypes.string.isRequired,
};

Discipline.defaultProps = {
  link: '/',
};

export const Disciplines = ({ disciplines }) => (
  <div className="Disciplines__wrapper">
    <h2 className="title">Our Disciplines</h2>
    <div className="Disciplines container">
      {(disciplines &&
        disciplines.edges &&
        disciplines.edges.map((discipline, key) => (
          <Discipline
            key={key}
            title={
              discipline.node && discipline.node.frontmatter && discipline.node.frontmatter.title
            }
            link={discipline.node && discipline.node.fields && discipline.node.fields.slug}
          />
        ))) || <div>No discipline available. Try again later.</div>}
    </div>
  </div>
);
