import React, { Component } from 'react';
import { TeamMember } from '../components/Team';
import { graphql } from 'gatsby';

import Layout from '../layouts/index';

import './team.css';

class Team extends Component {
  state = {
    activeMember: null,
    show: false,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ show: true }));
  }

  render() {
    return (
      <Layout>
        <div className="Team container">
          <div className="title">
            <p className="sub-title">Hi, have you met</p>
            <h2 className="title">Our Team?</h2>
          </div>

          <div className="TeamList">
            {this.props.data.allMarkdownRemark.edges.map((teamMembers, key) => (
              <TeamMember
                show={this.state.show}
                key={teamMembers.node.fields.slug}
                id={key}
                name={teamMembers.node.frontmatter.title}
                titles={teamMembers.node.frontmatter.titles}
                picture={teamMembers.node.frontmatter.avatar}
                content={teamMembers.node.frontmatter.details}
                slug={teamMembers.node.fields.slug}
                onActive={id => this.bindActive(id)}
                onDismiss={this.bindActive}
                active={this.state.activeMember === key}
              />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  bindActive = (elementToActivate = null) => {
    this.setState({
      activeMember: elementToActivate,
    });

    document.body.classList.toggle('no-scroll', elementToActivate !== null);
  };
}

export default Team;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { category: { eq: "team" } } }
      sort: { fields: [frontmatter___position], order: ASC }
      limit: 100
    ) {
      edges {
        node {
          fields {
            slug
            category
          }
          frontmatter {
            title
            titles
            avatar
            details
          }
        }
      }
    }
  }
`;
