import React from 'react';
import PropTypes from 'prop-types';

import required from '../../../../assets/icons/required.svg';
import requiredError from '../../../../assets/icons/requiredError.svg';

import { input, red, errorMessage } from './input.module.scss';

const Input = ({
  label,
  isRequired,
  name,
  type,
  placeholder,
  value,
  handleChange,
  error,
}) => (
  <div className={input}>
    <div>
      <label htmlFor={name}>{label}</label>
      {isRequired ? (
        <img src={error ? requiredError : required} alt="Required Icon" />
      ) : null}
    </div>
    <input
      id={name}
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={error ? red : null}
    />
    <p className={errorMessage}>{error}</p>
  </div>
);

export default Input;

Input.propTypes = {
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};
