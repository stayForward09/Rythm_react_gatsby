import React, { Component } from 'react';
import { TeamMember } from '../components/Team';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

import './team.css';

class Team extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMember: null,
      show: false,
    };

    this.bindActive = this.bindActive.bind(this);
  }

  bindActive(elementToActivate = null) {
    this.setState({
      activeMember: elementToActivate,
    });

    document.body.classList.toggle('no-scroll', elementToActivate !== null);
  }

  componentDidMount() {
    setTimeout(() => this.setState({ show: true }));
  }

  render() {
    return (
      <Layout>
        <div className="Team container">
          <div className="title">
            <p class="sub-title">Hi, have you met</p>
            <h2 class="title">Our Team?</h2>
          </div>

          <div className="TeamList">
            {this.props.data.allMarkdownRemark.edges.map((teamMembers, key) => (
              <TeamMember
                show={this.state.show}
                key={`team-member-${key}`}
                id={key}
                name={teamMembers.node.frontmatter.title}
                picture={teamMembers.node.frontmatter.avatar}
                content={teamMembers.node.html}
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
          html
          frontmatter {
            title
            avatar
          }
        }
      }
    }
  }
`;
