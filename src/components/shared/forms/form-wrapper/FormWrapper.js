import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import Modal from 'components/shared/modal';

const FormWrapper = ({ children, initialValues, schema, title, handleClose, footerContent }) => (
  <>
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={() => {}}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Modal
            title={title}
            isSubmitting={formik.isSubmitting}
            handleClose={handleClose}
            isSubmit
            footerContent={footerContent}
          >
            {children(formik)}
          </Modal>
        </form>
      )}
    </Formik>
  </>
);

export default FormWrapper;

FormWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  footerContent: PropTypes.node,
};
