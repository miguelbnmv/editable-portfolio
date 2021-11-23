import React from 'react';
import PropTypes from 'prop-types';

import { title } from './form-title.module.scss';

const FormTitle = ({ text, isList }) => (
  <h3 className={title} style={{ marginBottom: isList ? '2rem' : '0.5rem' }}>
    {text}
  </h3>
);

export default FormTitle;

FormTitle.propTypes = {
  text: PropTypes.string,
};
