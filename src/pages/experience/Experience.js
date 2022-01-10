import React, { useState, useContext, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getDatabase, ref, push, update, remove } from 'firebase/database';

import { Context } from 'context/userContext';

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
  const navigate = useNavigate();
  const user = useContext(Context);
  const db = getDatabase();
  const [addExperienceOpen, setAddExperienceOpen] = useState(false);
  const [myExperienceOpen, setMyExperienceOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const months = useMemo(() => [], []);
  const years = useMemo(() => [], []);
  const experiences = user?.info?.experiences;
  const id = searchParams.get('id');

  const experience = useMemo(
    () => Object.entries(experiences ?? {}).find((exp) => exp[0] === id),
    [experiences, id]
  );

  const handleButton = () => {
    setMyExperienceOpen(false);
    setAddExperienceOpen(true);
    navigate('/experience', { replace: true });
  };

  const addExperience = (values) => {
    push(ref(db, 'users/' + user?.id + '/experiences'), {
      name: values.experienceTitle,
      banner: values.experienceImages,
      date: values.experienceDate,
    });
    setAddExperienceOpen(false);
  };

  const editExperience = (values) => {
    update(ref(db, 'users/' + user?.id + '/experiences/' + experience[0]), {
      name: values.experienceTitle,
      banner: values.experienceImages,
      date: values.experienceDate,
    });
    setAddExperienceOpen(false);
    navigate('/experience', { replace: true });
  };

  const removeExperience = (id) => {
    remove(ref(db, 'users/' + user?.id + '/experiences/' + id));
    setAddExperienceOpen(false);
    navigate('/experience', { replace: true });
  };

  useMemo(
    () =>
      Object.entries(experiences ? experiences : {}).map((exp) => {
        const currentDate = new Date(exp[1].date);
        const year = currentDate.getFullYear();
        if (!years?.includes(year)) years.push(year);
        months.push(year + '_' + currentDate.getMonth());
        return null;
      }),
    [experiences, months, years]
  );

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
        title={id ? experience[1].title : 'Add experience'}
        handleSubmit={id ? editExperience : addExperience}
        handleClose={() => setAddExperienceOpen(false)}
      >
        {(formik) => <AddExperienceForm formik={formik} />}
      </FormWrapper>
    ) : (
      <Modal
        title="My experience"
        handleClose={() => setMyExperienceOpen(false)}
        handleButton={() => handleButton()}
      >
        <MyExperienceForm
          editHandler={() => handleButton()}
          removeHandler={(id) => removeExperience(id)}
        />
      </Modal>
    );

  if (!user?.info) return <span>loading...</span>; //melhorar design

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
                          <img src={exp?.banner} alt="User" />
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
            handle={() => setAddExperienceOpen(true)}
          />
        )}
      </section>
    </Layout>
  );
};

export default Experience;
