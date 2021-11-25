import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/shared/forms/input';
import Textarea from 'components/shared/forms/textarea';

const ContactForm = ({ formik }) => (
  <>
    <Input
      name="contactName"
      type="text"
      value={formik.values.contactName}
      handleChange={formik.handleChange}
      error={
        formik.errors?.contactName &&
        formik.touched?.contactName &&
        formik.errors?.contactName
      }
      placeholder="Insert your name"
      label="Name"
      isRequired
    />
    {}
    <Input
      name="contactEmail"
      type="text"
      value={formik.values.contactEmail}
      handleChange={formik.handleChange}
      error={
        formik.errors?.contactEmail &&
        formik.touched?.contactEmail &&
        formik.errors?.contactEmail
      }
      placeholder="Insert your e-mail"
      label="E-mail"
      isRequired
    />
    <Textarea
      name="contactMessage"
      value={formik.values.contactMessage}
      handleChange={formik.handleChange}
      error={
        formik.errors?.contactMessage &&
        formik.touched?.contactMessage &&
        formik.errors?.contactMessage
      }
      placeholder="Tell me what you need"
      label="Message"
      isRequired
    />
  </>
);

export default ContactForm;

ContactForm.propTypes = {
  formik: PropTypes.shape({
    values: PropTypes.object,
    handleChange: PropTypes.func,
    errors: PropTypes.object,
    touched: PropTypes.object,
  }),
};
