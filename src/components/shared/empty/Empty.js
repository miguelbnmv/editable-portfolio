import React from 'react';
import PropTypes from 'prop-types';

import Button from '../elements/button';

import { emptyState } from './empty.module.scss';

const Empty = ({ message, button, handle }) => {
  return (
    <div className={emptyState}>
      <h3>{message}</h3>
      <Button handle={handle} text={button} color="borderless" />
    </div>
  );
};

Empty.propTypes = {
  message: PropTypes.string,
  button: PropTypes.string,
  handle: PropTypes.func,
};

export default Empty;
