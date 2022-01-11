import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, update } from 'firebase/database';
//import Masonry from 'react-masonry-css';

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
  //masonry,
  //masonryColumn,
} from './project.module.scss';

const Project = () => {
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const { projectId } = useParams();
  const db = getDatabase();
  const user = useContext(Context);
  const projects = user?.info?.projects;

  const projectInfo = Object.entries(projects ? projects : {}).find(
    (project) => project[0] === projectId
  );

  const project = projectInfo ? projectInfo[1] : null;

  //const breakpointColumnsObj = {
  //  default: 2,
  //  800: 1,
  //};

  const editProject = (values) => {
    update(ref(db, 'users/' + user?.id + '/projects/' + projectInfo[0]), {
      title: values.projectTitle,
      quote: values.projectQuote,
      firstDescription: values.projectFirstDescription,
      firstDescriptionTitle: values.projectFirstDescriptionTitle,
      secondDescription: values.projectSecondDescription,
      secondDescriptionTitle: values.projectSecondDescriptionTitle,
      subject: values.projectSubject,
      date: values.projectDate,
      platforms: values.projectPlatforms,
      technologies: values.projectTechnologies,
      images: values.projectImages, //é preciso resolver a situação das imagens
    });
    setEditProjectOpen(false);
  };

  const modal = () => (
    <FormWrapper
      initialValues={initialValues(project)}
      schema={addProjectFormSchema}
      title={project.title}
      handleSubmit={editProject}
      handleClose={() => setEditProjectOpen(false)}
    >
      {(formik) => <AddProjectForm formik={formik} />}
    </FormWrapper>
  );

  if (!user?.info) return <></>;

  return (
    <Layout
      pageTitle={project?.title}
      noFill
      openModal={() => setEditProjectOpen(true)}
    >
      {editProjectOpen ? modal(true) : null}
      <div className={contentContainer}>
        <div className={hero}>
          <img src={project?.banner} alt="project-banner" />
          <h1>
            {project?.title}. {project?.title}.
          </h1>
        </div>
        <div className={main}>
          <div className={primaryBio}>
            <div className={about}>
              <div>
                <span>Subject</span>
                <span>{project?.subject}</span>
              </div>
              <div>
                <span>Platforms</span>
                <span>{project?.platforms}</span>
              </div>
              <div>
                <span>Technologies</span>
                <span>{project?.technologies}</span>
              </div>
              <div>
                <span>Year</span>
                <span>{project?.year}</span>
              </div>
            </div>
            <div>
              <h3>{project?.firstDescriptionTitle}</h3>
              <p>{project?.firstDescription}</p>
              <h4>"{project?.quote}"</h4>
            </div>
          </div>
          <img src={project?.firstDescription} alt="description-illustration" />
          <div className={secondaryBio}>
            <img
              src={project?.secondDescription}
              alt="description-illustration"
            />
            <div>
              <h3>{project?.secondDescriptionTitle}</h3>
              <p>{project?.secondDescription}</p>
            </div>
          </div>
          {/*           <Masonry //preciso resolver a situação das imagens
            breakpointCols={breakpointColumnsObj}
            className={masonry}
            columnClassName={masonryColumn}
          >
            {project?.images.map((img) => (
              <img src={img} alt="project-img" key={img} />
            ))}
          </Masonry> */}
        </div>
      </div>
    </Layout>
  );
};

export default Project;
