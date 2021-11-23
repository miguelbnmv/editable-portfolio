import React from 'react';
import PropTypes from 'prop-types';

import { input } from './files-input.module.scss';

const FilesInput = ({ label, name }) => {
  return (
    <div className={input}>
      <label htmlFor={name}>
        <div>{label}</div>
      </label>
      <input id={name} type="file" />
    </div>
  );
};

export default FilesInput;

FilesInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};
