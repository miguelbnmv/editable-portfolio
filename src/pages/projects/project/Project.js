import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Masonry from 'react-masonry-css';

import { Context } from 'context/userContext';

import Layout from 'components/shared/layout/Layout';

import {
  contentContainer,
  hero,
  main,
  primaryBio,
  about,
  secondaryBio,
  masonry,
  masonryColumn,
} from './project.module.scss';

const Project = () => {
  const { projectId } = useParams();
  const { projects } = useContext(Context);
  const project = projects.find(({ id }) => id === parseInt(projectId));

  const breakpointColumnsObj = {
    default: 2,
    800: 1,
  };

  return (
    <Layout pageTitle={project.name} noFill>
      <div className={contentContainer}>
        <div className={hero}>
          <img src={project.banner} alt="project-banner" />
          <h1>
            {project.name}. {project.name}.
          </h1>
        </div>
        <div className={main}>
          <div className={primaryBio}>
            <div className={about}>
              <div>
                <span>Subject</span>
                <span>{project.about.subject}</span>
              </div>
              <div>
                <span>Platforms</span>
                <span>{project.about.platforms}</span>
              </div>
              <div>
                <span>Technologies</span>
                <span>{project.about.technologies}</span>
              </div>
              <div>
                <span>Year</span>
                <span>{project.about.year}</span>
              </div>
            </div>
            <div>
              <h3>{project.primaryDescription.title}</h3>
              <p>{project.primaryDescription.description}</p>
              <h4>"{project.quote}"</h4>
            </div>
          </div>
          <img
            src={project.primaryDescription.image}
            alt="description-illustration"
          />
          <div className={secondaryBio}>
            <img
              src={project.secondaryDescription.image}
              alt="description-illustration"
            />
            <div>
              <h3>{project.secondaryDescription.title}</h3>
              <p>{project.secondaryDescription.description}</p>
            </div>
          </div>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={masonry}
            columnClassName={masonryColumn}
          >
            <img src={project.gallery.img0} alt="project-img" />
            <img src={project.gallery.img1} alt="project-img" />
            <img src={project.gallery.img2} alt="project-img" />
            <img src={project.gallery.img3} alt="project-img" />
            <img src={project.gallery.img4} alt="project-img" />
          </Masonry>
        </div>
      </div>
    </Layout>
  );
};

export default Project;
