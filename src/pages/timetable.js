import React, { PureComponent } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

import './timetable.css';

class Timetable extends PureComponent {
  render() {
    const { data } = this.props;

    return (
      <Layout>
        <div className="container">
          <h2 className="title">Timetable</h2>

          <div className="Timetable">
            {data.allMarkdownRemark.edges.map(branchTimetable => (
              <div key={`key-${branchTimetable.node.id}`}>
                <h3 className="title">{branchTimetable.node.frontmatter.title}</h3>
                <div>
                  {[
                    'monday',
                    'tuesday',
                    'wednesday',
                    'thursday',
                    'friday',
                    'saturday',
                    'sunday',
                  ].map(day => {
                    const key = `${day}-${branchTimetable.node.id}`;
                    let dayTimetable = branchTimetable.node.frontmatter[day];

                    if (!dayTimetable) {
                      return null;
                    }

                    dayTimetable = dayTimetable.replace(/\n\r?/g, '<br />');

                    return (
                      <div className="Timetable__day" key={key}>
                        <strong>{day}</strong>
                        <p dangerouslySetInnerHTML={{ __html: dayTimetable }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }
}

export default Timetable;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { category: { eq: "timetable" } } }
      sort: { fields: [frontmatter___title], order: DESC }
      limit: 5
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            monday
            tuesday
            wednesday
            thursday
            friday
            saturday
            sunday
          }
        }
      }
    }
  }
`;
