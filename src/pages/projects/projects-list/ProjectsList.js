import React, { useState, useContext, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getDatabase, ref, push, update, remove } from 'firebase/database';

import { Context } from 'context/userContext';

import Layout from 'components/shared/layout';
import Modal from 'components/shared/modal';
import Empty from 'components/shared/empty';
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
  const user = useContext(Context);
  const db = getDatabase();
  const [searchParams] = useSearchParams();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [addProjectOpen, setAddProjectOpen] = useState(false);
  const [myProjectsOpen, setMyProjectsOpen] = useState(false);
  const { x, y } = useMousePosition();
  const projects = user?.info?.projects;
  const id = searchParams.get('id');

  const project = useMemo(
    () => Object.entries(projects ?? {}).find((project) => project[0] === id),
    [id, projects]
  );

  const handleButton = () => {
    setMyProjectsOpen(false);
    setAddProjectOpen(true);
    navigate('/projects', { replace: true });
  };

  const addProject = (values) => {
    push(ref(db, 'users/' + user?.id + '/projects'), {
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
    setAddProjectOpen(false);
  };

  const editProject = (values) => {
    update(ref(db, 'users/' + user?.id + '/projects/' + project[0]), {
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
    setAddProjectOpen(false);
    navigate('/projects', { replace: true });
  };

  const removeProject = (id) => {
    remove(ref(db, 'users/' + user?.id + '/projects/' + id));
    setAddProjectOpen(false);
    navigate('/projects', { replace: true });
  };

  const modal = (isList) =>
    isList ? (
      <FormWrapper
        initialValues={initialValues(id ? project[1] : null)}
        schema={addProjectFormSchema}
        title={id ? project[1].title : 'Add project'}
        handleSubmit={id ? editProject : addProject}
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
        <MyProjectsForm
          editHandler={() => handleButton()}
          removeHandler={(id) => removeProject(id)}
        />
      </Modal>
    );

  if (!user?.info) return <></>;

  return (
    <Layout pageTitle="Projects" openModal={() => setMyProjectsOpen(true)}>
      <section className={contentContainer}>
        {addProjectOpen ? modal(true) : null}
        {myProjectsOpen ? modal(false) : null}
        {projects ? (
          <>
            <div className={projectName}>
              {Object.entries(projects).map((project) => (
                <ProjectCard
                  project={project}
                  key={project[0]}
                  setActiveIndex={setActiveIndex}
                />
              ))}
            </div>
            <div className={projectBanner}>
              {Object.entries(projects).map((project, index) => {
                const isActive = index === activeIndex;
                const xPos = isActive ? x : 0;
                const yPos = isActive ? y : 0;
                return (
                  <ProjectImage
                    url={project[1].images}
                    active={isActive}
                    key={project[0]}
                    x={xPos}
                    y={yPos}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <Empty
            message="Não existe nenhum projeto"
            button="Adiciona o teu primeiro projeto!"
            handle={() => setAddProjectOpen(true)}
          />
        )}
      </section>
    </Layout>
  );
};

export default ProjectsList;
