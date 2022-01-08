import React, { useState, useContext, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  const [addExperienceOpen, setAddExperienceOpen] = useState(false);
  const [myExperienceOpen, setMyExperienceOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const { experiences } = useContext(Context);
  const months = useMemo(() => [], []);
  const years = useMemo(() => [], []);

  const experience = experiences.find(
    ({ id }) => id === parseInt(searchParams.get('id'))
  );

  const handleButton = () => {
    setMyExperienceOpen(false);
    setAddExperienceOpen(true);
    navigate(`/experience`);
  };

  experiences.map(({ date }) => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    if (!years?.includes(year)) years.push(year);
    months.push(year + '_' + currentDate.getMonth());
    return null;
  });

  const modal = (isList) =>
    isList ? (
      <FormWrapper
        initialValues={initialValues(experience)}
        schema={addExperienceFormSchema}
        title="Add experience"
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
        <MyExperienceForm handle={() => handleButton()} />
      </Modal>
    );

  return (
    <Layout pageTitle="Experience" openModal={() => setMyExperienceOpen(true)}>
      <section className={contentContainer}>
        {addExperienceOpen ? modal(true) : null}
        {myExperienceOpen ? modal(false) : null}

        {/* if there is no data run: */}
        {/* <Empty message='Não existem experiências' button='Adiciona experiências à timeline'/> */}
        {/* else: */}
        <Carousel.Component
          options={{
            type: 'carousel',
            perView: 5,
            focusAt: 'center',
            startAt: '2',
            gap: 0,
          }}
          years={years}
        >
          {years.map((y) => {
            return allMonths.map((m, i) => {
              const hasExperience = months.find((x) => x === y + '_' + i);
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
                        <img src={experiences[0].banner} alt="User" />
                        <div className={experienceInfo}>
                          <span>{m}</span>
                          <h3>{experiences[0].name}</h3>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </Carousel.Slide>
              );
            });
          })}
        </Carousel.Component>
      </section>
    </Layout>
  );
};

export default Experience;
