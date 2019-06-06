import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import styled from "styled-components";
import MDXRenderer from "gatsby-mdx/mdx-renderer";

import { Layout, Wrapper, SEO, PrevNext } from "../components";
import ProjectHeader from "../components/Projects/ProjectHeader";

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const ProjectContent = styled.div`
  margin-top: 4rem;
`;

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 3rem 6rem;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 3rem 2rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    padding: 2rem 1.5rem;
  }
  overflow: hidden;
`;

const Project = ({
  pageContext: { slug, prev, next },
  data: { mdx: projectNode }
}) => {
  const project = projectNode.frontmatter;

  return (
    <Layout customSEO>
      <Wrapper>
        <SEO postPath={slug} postNode={projectNode} article />
        <ProjectHeader>
          <Link to="/projects">Back to Projects</Link>
        </ProjectHeader>
        <Content>
          <Title>{project.title}</Title>
          <ProjectContent>
            <MDXRenderer>{projectNode.code.body}</MDXRenderer>
          </ProjectContent>
          <PrevNext prefix={`/projects`} prev={prev} next={next} />
        </Content>
      </Wrapper>
    </Layout>
  );
};

export default Project;

Project.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    next: PropTypes.object,
    prev: PropTypes.object
  }),
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired
  }).isRequired
};

Project.defaultProps = {
  pageContext: PropTypes.shape({
    next: null,
    prev: null
  })
};

export const projectQuery = graphql`
  query projectBySlug($slug: String!) {
    mdx(
      fields: { slug: { eq: $slug } }
      fileAbsolutePath: { regex: "/projects/" }
    ) {
      code {
        body
      }
      frontmatter {
        title
        slogan
        date(formatString: "MM/DD/YYYY")
        tags
      }
      parent {
        ... on File {
          mtime
          birthtime
        }
      }
    }
  }
`;
