import React from 'react';
import PropTypes from 'prop-types';

import required from 'assets/icons/required.svg';
import requiredError from 'assets/icons/requiredError.svg';

import { textarea, red, errorMessage } from './textarea.module.scss';

const Textarea = ({
  label,
  isRequired,
  name,
  placeholder,
  value,
  handleChange,
  error,
}) => (
  <div className={textarea}>
    <div>
      <label htmlFor={name}>{label}</label>
      {isRequired ? (
        <img src={error ? requiredError : required} alt="Required Icon" />
      ) : null}
    </div>
    <textarea
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={error ? red : null}
    />
    <span className={errorMessage}>{error}</span>
  </div>
);

export default Textarea;

Textarea.propTypes = {
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};
