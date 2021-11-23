import React from 'react';
import PropTypes from 'prop-types';

import { wrapper, controls, remove } from './list-element.module.scss';

const Input = ({ name }) => (
  <div className={wrapper}>
    <span>{name}</span>
    <div className={controls}>
      <button onClick={() => {}}>edit</button>
      <button onClick={() => {}} className={remove}>
        delete
      </button>
    </div>
  </div>
);

export default Input;

Input.propTypes = {
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};
