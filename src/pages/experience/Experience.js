import React, { useState, useContext, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getDatabase, ref, push, update, remove } from 'firebase/database';
import {
  ref as sRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

import LinkedinIcon from 'assets/icons/linkedin.png';

import { Context } from 'context/userContext';
import { storage } from 'firebase/firebase.js';

import Layout from 'components/shared/layout';
import Modal from 'components/shared/modal';
import Empty from 'components/shared/empty';
import FormWrapper from 'components/shared/forms/form-wrapper';

import AddExperienceForm from 'components/experience/forms/add-experience-form';
import {
  initialValues,
  addExperienceFormSchema,
} from 'components/experience/forms/add-experience-form/utils';
import MyExperienceForm from 'components/experience/forms/my-experience-form';

import * as Carousel from 'components/experience/carousel';

import {
  contentContainer,
  monthWrapper,
  ball,
  green,
  experiencePop,
  innerPop,
  experienceInfo,
} from './experience.module.scss';

const allMonths = [
  'Jan',
  'Fev',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const Experience = () => {
  const [addExperienceOpen, setAddExperienceOpen] = useState(false);
  const [myExperienceOpen, setMyExperienceOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [photoChanged, setPhotoChanged] = useState(false);
  const [flag, setFlag] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const user = useContext(Context);
  const db = getDatabase();
  const months = useMemo(() => [], []);
  const years = useMemo(() => [], []);
  const id = searchParams.get('id');
  const experiences = user?.info?.experiences;

  const experience = useMemo(
    () => Object.entries(experiences ?? {}).find((exp) => exp[0] === id),
    [experiences, id]
  );

  const handleButton = (isNew) => {
    if (id) {
      getDownloadURL(sRef(storage, experience[1]?.image))
        .then((url) => {
          setImages([url]);
        })
        .finally(() => {
          setMyExperienceOpen(false);
          setAddExperienceOpen(true);
          if (isNew) navigate('/experience', { replace: true });
        });
    } else {
      setImages([]);
      setMyExperienceOpen(false);
      setAddExperienceOpen(true);
      if (isNew) navigate('/experience', { replace: true });
    }
  };

  const getImageInfo = () => {
    if (photoChanged) {
      if (images.length !== 0) {
        return `users/${user?.id}/experiences/${images[0]?.name}`;
      } else {
        return '';
      }
    } else {
      return experience[1]?.image;
    }
  };

  const editFunction = (values) => {
    uploadBytes(
      sRef(storage, `users/${user?.id}/experiences/${images[0].name}`),
      images[0]
    )
      .then((url) => {
        getDownloadURL(sRef(storage, url.ref))
          .then((url) => {
            document.getElementById(user?.info?.experiences[id]?.date).src =
              url;
          })
          .catch((error) => console.log(error));
      })
      .finally(() => {
        update(ref(db, 'users/' + user?.id + '/experiences/' + experience[0]), {
          name: values.experienceTitle,
          date: values.experienceDate,
          image: getImageInfo(),
        });
        setFlag(true);
        setPhotoChanged(false);
        setAddExperienceOpen(false);
        navigate('/experience', { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addExperience = (values) => {
    setFlag(false);
    if (photoChanged && images.length !== 0) {
      uploadBytes(
        sRef(storage, `users/${user?.id}/experiences/${images[0]?.name}`),
        images[0]
      )
        .then((url) => {
          getDownloadURL(sRef(storage, url.ref))
            .then((url) => {
              document.getElementById(user?.info?.experiences[id]?.date).src =
                url;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .finally(() => {
          push(ref(db, 'users/' + user?.id + '/experiences'), {
            name: values.experienceTitle,
            date: values.experienceDate,
            image: `users/${user?.id}/experiences/${images[0]?.name}`,
          });
          setAddExperienceOpen(false);
        });
    } else {
      push(ref(db, 'users/' + user?.id + '/experiences'), {
        name: values.experienceTitle,
        date: values.experienceDate,
        image: '',
      });
      setAddExperienceOpen(false);
    }
  };

  const editExperience = (values) => {
    setFlag(false);
    if (photoChanged && images.length !== 0) {
      if (experience[1]?.image === '') {
        editFunction(values);
      } else {
        deleteObject(sRef(storage, experience[1]?.image))
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            editFunction(values);
          });
      }
    } else {
      update(ref(db, 'users/' + user?.id + '/experiences/' + experience[0]), {
        name: values.experienceTitle,
        date: values.experienceDate,
        image: getImageInfo(),
      });
      setFlag(true);
      setPhotoChanged(false);
      setAddExperienceOpen(false);
      navigate('/experience', { replace: true });
    }
  };

  const removeExperience = (id) => {
    remove(ref(db, 'users/' + user?.id + '/experiences/' + id));
    setAddExperienceOpen(false);
    navigate('/experience', { replace: true });
  };

  Object.entries(experiences ? experiences : {}).map((exp) => {
    const currentDate = new Date(exp[1].date);
    const year = currentDate.getFullYear();
    if (!years?.includes(year)) years.push(year);
    months.push(year + '_' + currentDate.getMonth());
    return null;
  });

  const dates = years?.reduce((acc, cur) => {
    const temp = allMonths.reduce((acc, _, i) => {
      return [...acc, cur + '_' + i];
    }, []);
    return [...acc, ...temp];
  }, []);

  const modal = (isList) =>
    isList ? (
      <FormWrapper
        initialValues={initialValues(id ? experience[1] : null)}
        schema={addExperienceFormSchema}
        title={id ? experience[1]?.name : 'Add experience'}
        handleSubmit={id ? editExperience : addExperience}
        handleClose={() => setAddExperienceOpen(false)}
      >
        {(formik) => (
          <AddExperienceForm
            formik={formik}
            urls={images}
            setImages={setImages}
            setPhotoChanged={setPhotoChanged}
          />
        )}
      </FormWrapper>
    ) : (
      <Modal
        title="My experiences"
        handleClose={() => setMyExperienceOpen(false)}
        handleButton={() => handleButton(true)}
      >
        <MyExperienceForm
          editHandler={() => handleButton()}
          removeHandler={(id) => removeExperience(id)}
        />
      </Modal>
    );

  useEffect(() => {  
    document
      .querySelector('body')
      .classList.add(
        user?.info?.info?.color === '' ? 'green-theme' : user?.info?.info?.color
      );

    if (experiences && flag) {
      Object.keys(experiences).map((id) => {
        if (user?.info?.experiences[id]?.image === '') {
          return (document.getElementById(
            user?.info?.experiences[id]?.date
          ).src = LinkedinIcon);
        } else {
          return getDownloadURL(
            sRef(storage, user?.info?.experiences[id]?.image)
          ).then((url) => {
            document.getElementById(user?.info?.experiences[id]?.date).src =
              url;
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experiences, user?.info?.info?.color]);

  if (!user?.info) return <></>;

  return (
    <Layout pageTitle="Experience" openModal={() => setMyExperienceOpen(true)}>
      <section className={contentContainer}>
        {addExperienceOpen ? modal(true) : null}
        {myExperienceOpen ? modal(false) : null}
        {experiences ? (
          <Carousel.Component
            options={{
              type: 'carousel',
              perView: 5,
              focusAt: 'center',
              startAt: '2',
              gap: 0,
            }}
            dates={dates}
          >
            {years.map((y) => {
              return allMonths.map((m, i) => {
                const hasExperience = months.find((x) => x === y + '_' + i);
                const exp =
                  Object.values(experiences)[
                    months.indexOf(hasExperience ?? null)
                  ];
                return (
                  <Carousel.Slide key={i}>
                    <div className={`${monthWrapper} ${'monthWrapper'}`}>
                      <span id={y + '_' + m}>{m}</span>
                      <div
                        className={`${ball} ${'ball'} ${
                          hasExperience ? green : null
                        }`}
                      ></div>
                    </div>
                    {hasExperience ? (
                      <div className={`${experiencePop} ${'experiencePop'}`}>
                        <div className={innerPop}>
                          <img id={exp?.date} alt="Exp" />
                          <div className={experienceInfo}>
                            <span>{m}</span>
                            <h3>{exp?.name}</h3>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </Carousel.Slide>
                );
              });
            })}
          </Carousel.Component>
        ) : (
          <Empty
            message="Não existem experiências"
            button="Adiciona experiências à timeline"
            handle={() => handleButton()}
          />
        )}
      </section>
    </Layout>
  );
};

export default Experience;
