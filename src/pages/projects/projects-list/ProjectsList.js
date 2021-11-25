import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Layout from 'components/shared/layout';
import Modal from 'components/shared/modal';
import FormWrapper from 'components/shared/forms/form-wrapper';
import ProjectCard from 'components/projects/project-card';

import AddProjectForm from 'components/projects/forms/add-project-form';
import {
  initialValues,
  addProjectFormSchema,
} from 'components/projects/forms/add-project-form/utils';
import MyProjectsForm from 'components/projects/forms/my-projects-form';

import Data from 'assets/json/Projects.json';

import { contentContainer } from './projects-list.module.scss';

const ProjectsList = () => {
  const navigate = useNavigate();
  const [addProjectOpen, setAddProjectOpen] = useState(false);
  const [myProjectsOpen, setMyProjectsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const project = Data.find(
    ({ id }) => id === parseInt(searchParams.get('id'))
  );

  const handleButton = () => {
    setMyProjectsOpen(false);
    setAddProjectOpen(true);
    navigate(`/projects`);
  };

  const modal = (isList) =>
    isList ? (
      <FormWrapper
        initialValues={initialValues(project)}
        schema={addProjectFormSchema}
        title="Add project"
        handleClose={() => setAddProjectOpen(false)}
      >
        {(formik) => <AddProjectForm formik={formik} />}
      </FormWrapper>
    ) : (
      <Modal
        title="My projects"
        handleClose={() => setMyProjectsOpen(false)}
        handleButton={() => handleButton()}
      >
        <MyProjectsForm handle={() => handleButton()} />
      </Modal>
    );

  return (
    <Layout pageTitle="Projects" openModal={() => setMyProjectsOpen(true)}>
      <section className={contentContainer}>
        {addProjectOpen ? modal(true) : null}
        {myProjectsOpen ? modal(false) : null}
        {Data.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </section>
    </Layout>
  );
};

export default ProjectsList;
