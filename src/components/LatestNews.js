import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'gatsby';

import './LatestNews.css';

const NewsCard = ({ title, date, excerpt, slug }) => (
  <div className="LatestNews__card__wrapper">
    <Link to={slug} className="LatestNews__card">
      <h4>{title}</h4>
      <div className="LatestNews__card__content">
        <p>{excerpt}</p>
      </div>
      <div className="LatestNews__card__footer">
        <span>{date}</span>
      </div>
    </Link>
  </div>
);

export const LatestNews = props => {
  return (
    <div className="LatestNews">
      <h2 className="title">Latest News</h2>
      <div className="LatestNews__wrapper">
        <div className="LatestNews__cards__wrapper">
          <NewsCard {...props} />
        </div>
      </div>
    </div>
  );
};

LatestNews.propTypes = {
  title: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
  excerpt: propTypes.string.isRequired,
  slug: propTypes.string.isRequired,
};
