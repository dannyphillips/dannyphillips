import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import styled from "styled-components";
import defaultLogo from "../logo.png";
import appsBackground from "../assets/apps-bg-small.png";

import { Cover, SectionTitle, Flex, Layout, ProjectTile } from "../components";

const AppsCover = styled(Cover)`
  background: url(${appsBackground}) repeat 0 0;
  animation: slide 30s linear infinite;
  @keyframes slide {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 0 -400px;
    }
  }
`;
const Title = styled(SectionTitle)`
  margin: 40px;
`;

const ProjectsPage = ({
  data: {
    allMdx: { edges: projects },
    allFile: { edges: logos }
  }
}) => (
  <Layout>
    <AppsCover/>
    <Title>My Apps</Title>
    <Flex>
      {projects.map(project => {
        let projectLogo = logos.find(logo =>
          project.node.fields.slug.includes(logo.node.relativeDirectory)
        );
        return (
          <ProjectTile
            appIcon={projectLogo ? projectLogo.node.publicURL : defaultLogo}
            title={project.node.frontmatter.title}
            slogan={project.node.frontmatter.slogan}
            slug={project.node.fields.slug}
            tags={project.node.frontmatter.tags}
            key={project.node.fields.slug}
          />
        );
      })}
    </Flex>
  </Layout>
);

ProjectsPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired
    }),
    allFiles: PropTypes.shape({
      edges: PropTypes.array.isRequired
    })
  }).isRequired
};

export default ProjectsPage;

export const ProjectsQuery = graphql`
         query ProjectsQuery {
           allFile(
             filter: {
               name: { regex: "/logo/" }
               extension: { regex: "/png|jpg/" }
               absolutePath: { regex: "/projects/" }
             }
           ) {
             edges {
               node {
                 publicURL
                 relativeDirectory
               }
             }
           }
           allMdx(
             sort: { fields: [frontmatter___title], order: ASC }
             filter: {
               fileAbsolutePath: { regex: "/projects/" }
               fields: { released: { eq: true } }
             }
           ) {
             edges {
               node {
                 fields {
                   slug
                 }
                 frontmatter {
                   title
                   slogan
                   date(formatString: "MM/DD/YYYY")
                   tags
                 }
               }
             }
           }
         }
       `;
