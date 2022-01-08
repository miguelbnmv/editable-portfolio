import React from 'react';
import PropTypes from 'prop-types';
import Button from '../elements/button/Button';
import { emptyState } from './empty.module.scss';

const Empty = ({ message, button }) => {

  return (
    <div className={emptyState}>
      <h3>{message}</h3>
      <Button
          handle={null}
          text={button}
          color="borderless"
        />
    </div>
  );
};

Empty.propTypes = {
  message: PropTypes.string,
  button: PropTypes.string,
};


export default Empty;
