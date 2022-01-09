import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Context } from 'context/userContext';

import Layout from 'components/shared/layout';
import Modal from 'components/shared/modal';
//import Empty from 'components/shared/empty';
import FormWrapper from 'components/shared/forms/form-wrapper';
import ProjectCard from 'components/projects/project-card';
import ProjectImage from 'components/projects/project-image';

import AddProjectForm from 'components/projects/forms/add-project-form';
import {
  initialValues,
  addProjectFormSchema,
} from 'components/projects/forms/add-project-form/utils';
import MyProjectsForm from 'components/projects/forms/my-projects-form';

import {
  contentContainer,
  projectName,
  projectBanner,
} from './projects-list.module.scss';

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};

const ProjectsList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [addProjectOpen, setAddProjectOpen] = useState(false);
  const [myProjectsOpen, setMyProjectsOpen] = useState(false);
  const { projects } = useContext(Context);
  const { x, y } = useMousePosition();

  const project = projects.find(
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

        {/* if there is no data run: */}
        {/* <Empty message='Não existe nenhum projeto' button='Adiciona o teu primeiro projeto!'/> */}
        {/* else: */}
        <div className={projectName}>
          {projects.map((project, index) => (
            <ProjectCard
              project={project}
              key={project.id}
              setActiveIndex={setActiveIndex}
              index={index}
            />
          ))}
        </div>
        <div className={projectBanner}>
          {projects.map(({ id, banner }, index) => {
            const isActive = index === activeIndex;
            const xPos = isActive ? x : 0;
            const yPos = isActive ? y : 0;
            return (
              <ProjectImage
                url={banner}
                active={isActive}
                key={id}
                x={xPos}
                y={yPos}
              />
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsList;
