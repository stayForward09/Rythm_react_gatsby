import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'gatsby';

import './Footer.css';

export const Footer = ({ disciplines, legals }) => (
  <div className="Footer">
    <div className="container">
      <div className="grid__container">
        <div className="grid__column">
          <img className="logo" src="/img/logo.png" alt="Rhythmic Excellence logo" />
        </div>
        <div className="grid__column">
          <h4>Disciplines</h4>
          <ul>
            {disciplines.map((discipline, key) => (
              <li key={`footer__discipline__${key}`}>
                <Link to={discipline.node.fields.slug}>{discipline.node.frontmatter.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid__column">
          <h4>Legal</h4>
          <ul>
            {legals.map((legal, key) => (
              <li key={`footer__legal__${key}`}>
                <Link to={legal.node.fields.slug}>{legal.node.frontmatter.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid__column copy">
          &copy; Copyright 2018{' '}
          <a href="https://about.me/andreasonny83" target="_blank" rel="noopener noreferrer">
            Sonny
          </a>{' '}
          - All Rights Reserved
        </div>
        <div className="grid__column social">
          <ul>
            <li>facebbok1</li>
            <li>facebbok2</li>
            <li>facebbok3</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

Footer.propTypes = {
  disciplines: propTypes.any.isRequired,
  legals: propTypes.any.isRequired,
};
