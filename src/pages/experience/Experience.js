import React, { useState, useContext, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Context } from 'context/userContext';

import Layout from 'components/shared/layout';
import Modal from 'components/shared/modal';
import FormWrapper from 'components/shared/forms/form-wrapper';

import AddExperienceForm from 'components/experience/forms/add-experience-form';
import {
  initialValues,
  addExperienceFormSchema,
} from 'components/experience/forms/add-experience-form/utils';
import MyExperienceForm from 'components/experience/forms/my-experience-form';

import * as Carousel from 'components/experience/carousel';

import { contentContainer, ball, green } from './experience.module.scss';

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
                  <span id={y + '_' + m}>{m}</span>
                  <div
                    className={`${ball} ${hasExperience ? green : null}`}
                  ></div>
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
