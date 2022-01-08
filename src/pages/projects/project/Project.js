import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Masonry from 'react-masonry-css';

import { Context } from 'context/userContext';

import Layout from 'components/shared/layout/Layout';
import FormWrapper from 'components/shared/forms/form-wrapper';
import AddProjectForm from 'components/projects/forms/add-project-form';
import {
  initialValues,
  addProjectFormSchema,
} from 'components/projects/forms/add-project-form/utils';

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
  const [editProject, setEditProject] = useState(false);
  const { projectId } = useParams();
  const { projects } = useContext(Context);
  const project = projects.find(({ id }) => id === parseInt(projectId));

  const breakpointColumnsObj = {
    default: 2,
    800: 1,
  };

  const modal = () => (
    <FormWrapper
      initialValues={initialValues(project)}
      schema={addProjectFormSchema}
      title={project.name}
      handleClose={() => setEditProject(false)}
    >
      {(formik) => <AddProjectForm formik={formik} />}
    </FormWrapper>
  );

  return (
    <Layout
      pageTitle={project.name}
      noFill
      openModal={() => setEditProject(true)}
    >

      {editProject ? modal(true) : null}
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
            {project.gallery.map((img) => (
              <img src={img} alt="project-img" key={img} />
            ))}
          </Masonry>
        </div>
      </div>
    </Layout>
  );
};

export default Project;
