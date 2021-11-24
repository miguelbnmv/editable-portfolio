import React, { useState } from 'react';
import { Formik } from 'formik';

import Layout from '../../components/shared/layout';
import Modal from '../../components/shared/modal';

import AddExperienceForm from '../../components/experience/forms/add-experience-form';
import {
  initialValues,
  addExperienceFormSchema,
} from '../../components/experience/forms/add-experience-form/utils';

const Experience = () => {
  const [modal, setModal] = useState(false);

  return (
    <Layout pageTitle="Experience" openModal={() => setModal(true)}>
      <div>
        {modal ? (
          <Formik
            initialValues={initialValues}
            validationSchema={addExperienceFormSchema}
            onSubmit={() => {}}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <Modal
                  title="Add experience"
                  isSubmitting={formik.isSubmitting}
                  onChange={() => setModal(false)}
                  isSubmit
                >
                  <AddExperienceForm formik={formik} />
                </Modal>
              </form>
            )}
          </Formik>
        ) : null}
        <h1>Experience.</h1>
      </div>
    </Layout>
  );
};

export default Experience;
