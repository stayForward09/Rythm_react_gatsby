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

NewsCard.propTypes = {
  title: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
  excerpt: propTypes.string.isRequired,
  slug: propTypes.string.isRequired,
};

export const LatestNews = ({ edges }) => {
  return (
    <div className="LatestNews">
      <h2 className="title">Latest News</h2>
      <div className="LatestNews__wrapper">
        <div className="LatestNews__cards__wrapper">
          {edges.map((edge, index) => (
            <NewsCard
              key={`news--${index}`}
              excerpt={edge.node && edge.node.excerpt}
              title={edge.node && edge.node.frontmatter && edge.node.frontmatter.title}
              date={edge.node && edge.node.frontmatter && edge.node.frontmatter.date}
              slug={edge.node && edge.node.fields && edge.node.fields.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

LatestNews.propTypes = {
  edges: propTypes.any.isRequired,
};
