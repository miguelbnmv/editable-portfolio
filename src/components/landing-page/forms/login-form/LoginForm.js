import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/shared/forms/input';

const LoginForm = ({ formik }) => (
  <>
    <Input
      name="loginEmail"
      type="text"
      value={formik.values.loginEmail}
      handleChange={formik.handleChange}
      error={
        formik.errors?.loginEmail &&
        formik.touched?.loginEmail &&
        formik.errors?.loginEmail
      }
      placeholder="Insert your e-mail"
      label="E-mail"
      isRequired
    />
    <Input
      name="loginPassword"
      type="password"
      value={formik.values.loginPassword}
      handleChange={formik.handleChange}
      error={
        formik.errors?.loginPassword &&
        formik.touched?.loginPassword &&
        formik.errors?.loginPassword
      }
      placeholder="Insert your password"
      label="Password"
      isRequired
    />
  </>
);

export default LoginForm;

LoginForm.propTypes = {
  formik: PropTypes.shape({
    values: PropTypes.object,
    handleChange: PropTypes.func,
    errors: PropTypes.object,
    touched: PropTypes.object,
  }),
};
