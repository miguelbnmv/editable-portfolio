import React, { useContext, useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, update } from 'firebase/database';
import {
  ref as sRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';
import Masonry from 'react-masonry-css';

import ProjectsPlaceholder from 'assets/images/ExperiencePlaceholder.png';

import { Context } from 'context/userContext';
import { storage } from 'firebase/firebase.js';

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
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [imgsSrc, setImgsSrc] = useState([]);
  const [images, setImages] = useState([]);
  const [flag, setFlag] = useState(true);
  const { projectId } = useParams();
  const db = getDatabase();
  const user = useContext(Context);
  const projects = user?.info?.projects;

  const projectInfo = useMemo(
    () =>
      Object.entries(projects ? projects : {}).find(
        (project) => project[0] === projectId
      ),
    [projectId, projects]
  );

  const project = projectInfo ? projectInfo[1] : null;

  const breakpointColumnsObj = {
    default: 2,
    800: 1,
  };

  const putStorageItem = (image) => {
    return uploadBytes(
      sRef(storage, `users/${user?.id}/projects/${image.name}`),
      image
    );
  };

  const editProject = (values) => {
    setFlag(false);
    setImgsSrc([]);
    listAll(sRef(storage, 'users/' + user?.id + '/projects'))
      .then((res) => {
        res.items.forEach((itemRef) => {
          deleteObject(itemRef);
        });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        const imgs = images.map(({ name }) => {
          return `users/${user?.id}/projects/${name}`;
        });

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
          images: imgs,
        });
        Promise.all(images.map((image) => putStorageItem(image)))
          .then((urls) => {
            urls.map((url) => {
              return getDownloadURL(sRef(storage, url.ref))
                .then((url) => {
                  setImgsSrc((old) => [...old, url]);
                })
                .catch((error) => console.log(error));
            });
            setFlag(true);
            setEditProjectOpen(false);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  const modal = () => (
    <FormWrapper
      initialValues={initialValues(project)}
      schema={addProjectFormSchema}
      title={project.title}
      handleSubmit={editProject}
      handleClose={() => setEditProjectOpen(false)}
    >
      {(formik) => (
        <AddProjectForm
          formik={formik}
          urls={images.length === 0 ? imgsSrc : images}
          setImages={setImages}
        />
      )}
    </FormWrapper>
  );

  useEffect(() => {
    if (project && flag) {
      project?.images?.map((img) => {
        return getDownloadURL(sRef(storage, img))
          .then((url) => {
            setImgsSrc((old) => [...old, url]);
          })
          .catch((error) => console.log(error));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

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
          <img src={imgsSrc[0]  ?? ProjectsPlaceholder} alt="project-banner" />
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
                <span>{project?.date.split('-')[0]}</span>
              </div>
            </div>
            <div>
              <h3>{project?.firstDescriptionTitle}</h3>
              <p>{project?.firstDescription}</p>
              <h4>"{project?.quote}"</h4>
            </div>
          </div>
          <img src={imgsSrc[1] ?? ProjectsPlaceholder} alt="description-illustration" />
          <div className={secondaryBio}>
            <img src={imgsSrc[2]  ?? ProjectsPlaceholder} alt="description-illustration" />
            <div>
              <h3>{project?.secondDescriptionTitle}</h3>
              <p>{project?.secondDescription}</p>
            </div>
          </div>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={masonry}
            columnClassName={masonryColumn}
          >
            {imgsSrc?.map((img) => (
              <img src={img} alt="project-img" key={img} />
            ))}
          </Masonry>
        </div>
      </div>
    </Layout>
  );
};

export default Project;
