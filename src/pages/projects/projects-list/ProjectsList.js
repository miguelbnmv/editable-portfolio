import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { getDatabase, ref, push, update, remove } from 'firebase/database';
import {
  ref as sRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';

import { Context } from 'context/userContext';
import { storage } from 'firebase/firebase.js';

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

const ProjectsList = ({ hasId }) => {
  const navigate = useNavigate();
  const user = useContext(Context);
  const db = getDatabase();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [addProjectOpen, setAddProjectOpen] = useState(false);
  const [myProjectsOpen, setMyProjectsOpen] = useState(false);
  const [photoChanged, setPhotoChanged] = useState(false);
  const [project, setProject] = useState(null);
  const [images, setImages] = useState([]);
  const { x, y } = useMousePosition();
  const projects = user?.info?.projects;
  const { userId } = useParams();

  const handleButton = (isEdit, elProject) => {
    if (elProject && isEdit) {
      setProject(elProject);
      setImages([]);
      console.log(elProject[1]?.images);
      Promise.all(
        elProject[1]?.images?.map((image) => {
          return getDownloadURL(sRef(storage, image)).then((url) => {
            setImages((old) => [...old, url]);
          });
        })
      )
        .finally(() => {
          setMyProjectsOpen(false);
          setAddProjectOpen(true);
          navigate('/projects', {
            replace: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setProject(null);
      setImages([]);
      setMyProjectsOpen(false);
      setAddProjectOpen(true);
      navigate('/projects', { replace: true });
    }
  };

  const addProject = (values) => {
    if (photoChanged && images.length !== 0) {
      Promise.all(
        images.map((image) => {
          return uploadBytes(
            sRef(
              storage,
              `users/${user?.id}/projects/${values.projectTitle}/${image.name}`
            ),
            image
          );
        })
      )
        .finally(() => {
          const imgs = images?.map(({ name }) => {
            return `users/${user?.id}/projects/${values.projectTitle}/${name}`;
          });
          push(ref(db, 'users/' + user?.id + '/projects/'), {
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
            images: imgs,
          });
          setAddProjectOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      push(ref(db, 'users/' + user?.id + '/projects/'), {
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
        images: [],
      });
    }
  };

  const getImageInfo = () => {
    if (photoChanged) {
      if (images.length !== 0) {
        return images?.map((img) => {
          return `users/${user?.id}/projects/${project.title}/${img?.name}`;
        });
      } else {
        return [];
      }
    } else {
      return project[1]?.images;
    }
  };

  const editFunction = (values) => {
    Promise.all(
      images.map((image) => {
        return uploadBytes(
          sRef(
            storage,
            `users/${user?.id}/projects/$${project.title}/${image.name}`
          ),
          image
        );
      })
    )
      .finally(() => {
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
          images: getImageInfo(),
        });
        setPhotoChanged(false);
        setAddProjectOpen(false);
        navigate('/projects', { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editProject = (values) => {
    if (photoChanged && images.length !== 0) {
      if (project[1]?.images === []) {
        editFunction(values);
      } else {
        listAll(sRef(storage, `users/${user?.id}/projects/$${project.title}`))
          .then((res) => {
            res.items.forEach((itemRef) => {
              deleteObject(sRef(storage, itemRef)).catch((error) => {
                console.log(error);
              });
            });
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            editFunction(values);
          });
      }
    } else {
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
        images: getImageInfo(),
      });
      setPhotoChanged(false);
      setAddProjectOpen(false);
      navigate('/projects', { replace: true });
    }
  };

  const removeProject = (id) => {
    remove(ref(db, 'users/' + user?.id + '/projects/' + id));
    setAddProjectOpen(false);
    navigate('/projects', { replace: true });
  };

  const modal = (isList) =>
    isList ? (
      <FormWrapper
        initialValues={initialValues(project ? project[1] : null)}
        schema={addProjectFormSchema}
        title={project ? project[1].title : 'Add project'}
        handleSubmit={project ? editProject : addProject}
        handleClose={() => setAddProjectOpen(false)}
      >
        {(formik) => (
          <AddProjectForm
            formik={formik}
            urls={images}
            setImages={setImages}
            setPhotoChanged={setPhotoChanged}
          />
        )}
      </FormWrapper>
    ) : (
      <Modal
        title="My projects"
        handleClose={() => setMyProjectsOpen(false)}
        handleButton={() => handleButton()}
      >
        <MyProjectsForm
          editHandler={handleButton}
          removeHandler={(id) => removeProject(id)}
        />
      </Modal>
    );

  useEffect(() => {
    if (user?.info?.info?.color) {
      const element = document.querySelector('body');
      const classList = element.className.split(/\s+/);
      for (var i = 0; i < classList.length; i++) {
        if (classList[i]?.split('-')[1] === 'theme') {
          element.classList.remove(classList[i]);
        }
      }
      element.classList.add(user?.info?.info?.color);
    }
    user?.setId(userId);
  }, [user, userId]);

  if (!user?.info) return <></>;

  return (
    <Layout
      pageTitle="Projects"
      hasId={hasId}
      openModal={() => setMyProjectsOpen(true)}
    >
      <section className={contentContainer}>
        {addProjectOpen ? modal(true) : null}
        {myProjectsOpen ? modal(false) : null}
        {projects ? (
          <>
            <div className={projectName}>
              {Object.entries(projects).map((project, index) => (
                <ProjectCard
                  project={project}
                  key={project[0]}
                  setActiveIndex={setActiveIndex}
                  index={index}
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
                    project={project}
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
            hasId={hasId}
          />
        )}
      </section>
    </Layout>
  );
};

export default ProjectsList;

ProjectsList.propTypes = {
  hasId: PropTypes.bool,
};
