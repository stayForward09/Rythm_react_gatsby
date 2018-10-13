import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'gatsby';
import {
  IoLogoGoogleplus,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoYoutube,
} from 'react-icons/io';
import { VERSION } from '../config';

import './Footer.css';

const renderIcon = iconName => {
  switch (iconName.toLowerCase()) {
    case 'facebook':
      return <IoLogoFacebook size="1.7em" />;
    case 'twitter':
      return <IoLogoTwitter size="1.7em" />;
    case 'googleplus':
      return <IoLogoGoogleplus size="1.7em" />;
    case 'instagram':
      return <IoLogoInstagram size="1.7em" />;
    case 'youtube':
      return <IoLogoYoutube size="1.7em" />;
    default:
      return;
  }
};

export const Footer = ({ disciplines, legals, socials }) => (
  <div className="Footer">
    <div className="container">
      <div className="grid__container">
        <div className="grid__column">
          <img className="logo" src="/img/logo.png" alt="Rhythmic Excellence logo" />
        </div>

        <div className="grid__column">
          <h4>Disciplines</h4>
          <ul>
            {disciplines.map(discipline => (
              <li key={discipline.node.id}>
                <Link to={discipline.node.fields.slug}>{discipline.node.frontmatter.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid__column">
          <h4>Other Links</h4>
          <ul>
            <li>
              <Link to="/timetable">Timetable</Link>
            </li>
            <li>
              <Link to="/team">Meet our team</Link>
            </li>
            <li>
              <Link to="/news">News</Link>
            </li>
          </ul>
        </div>

        <div className="grid__column">
          <h4>Legal</h4>
          <ul>
            {legals.map(legal => (
              <li key={legal.node.id}>
                <Link to={legal.node.fields.slug}>{legal.node.frontmatter.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid__column copy">
          <div className="version">RhythmicExcellence v{`${VERSION}`}</div>

          <div>
            &copy; Copyright 2018{' '}
            <a href="https://about.me/andreasonny83" target="_blank" rel="noopener noreferrer">
              Sonny
            </a>{' '}
            - All Rights Reserved
          </div>
        </div>
        <div className="grid__column social">
          <ul>
            {socials.map(social => (
              <li key={social.node.id}>
                <a
                  href={social.node.frontmatter.link}
                  alt={social.node.frontmatter.title}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {renderIcon(social.node.frontmatter.icon)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

Footer.propTypes = {
  disciplines: propTypes.any.isRequired,
  legals: propTypes.any.isRequired,
  socials: propTypes.any.isRequired,
};
