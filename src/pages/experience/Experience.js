import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Layout from 'components/shared/layout';
import Modal from 'components/shared/modal';
import FormWrapper from 'components/shared/forms/form-wrapper';

import AddExperienceForm from 'components/experience/forms/add-experience-form';
import {
  initialValues,
  addExperienceFormSchema,
} from 'components/experience/forms/add-experience-form/utils';
import MyExperienceForm from 'components/experience/forms/my-experience-form';

import Data from 'assets/json/Experience.json';

const Experience = () => {
  const navigate = useNavigate();
  const [addExperienceOpen, setAddExperienceOpen] = useState(false);
  const [myExperienceOpen, setMyExperienceOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const experience = Data.find(
    ({ id }) => id === parseInt(searchParams.get('id'))
  );

  const handleButton = () => {
    setMyExperienceOpen(false);
    setAddExperienceOpen(true);
    navigate(`/experience`);
  };

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
      <section>
        {addExperienceOpen ? modal(true) : null}
        {myExperienceOpen ? modal(false) : null}
        <h1>Experience.</h1>
      </section>
    </Layout>
  );
};

export default Experience;
