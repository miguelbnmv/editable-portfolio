import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/shared/forms/input';

const RegisterForm = ({ formik, error }) => (
  <>
    <Input
      name="registerEmail"
      type="text"
      value={formik.values.registerEmail}
      handleChange={formik.handleChange}
      error={
        formik.errors?.registerEmail &&
        formik.touched?.registerEmail &&
        formik.errors?.registerEmail
      }
      placeholder="Insert your e-mail"
      label="E-mail"
      isRequired
    />
    <Input
      name="registerPassword"
      type="password"
      value={formik.values.registerPassword}
      handleChange={formik.handleChange}
      error={
        formik.errors?.registerPassword &&
        formik.touched?.registerPassword &&
        formik.errors?.registerPassword
      }
      placeholder="Insert your password"
      label="Password"
      isRequired
    />
    <Input
      name="registerRepeatPassword"
      type="password"
      value={formik.values.registerRepeatPassword}
      handleChange={formik.handleChange}
      error={
        formik.errors?.registerRepeatPassword &&
        formik.touched?.registerRepeatPassword &&
        formik.errors?.registerRepeatPassword
      }
      placeholder="Please repeat your password"
      label="Repeat password"
      isRequired
    />
    {error ? <span style={{ color: '#F2122D' }}>Error: {error}</span> : null}
  </>
);

export default RegisterForm;

RegisterForm.propTypes = {
  formik: PropTypes.shape({
    values: PropTypes.object,
    handleChange: PropTypes.func,
    errors: PropTypes.object,
    touched: PropTypes.object,
  }),
  error: PropTypes.string,
};
