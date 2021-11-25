import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/shared/elements/button';

import { wrapper, controls } from './list-element.module.scss';

const ListElement = ({ name, editHandle }) => (
  <div className={wrapper}>
    <span>{name}</span>
    <div className={controls}>
      <Button text="edit" color="borderless" handle={editHandle} />
      <Button text="delete" color="borderless" handle={() => {}} />
    </div>
  </div>
);

export default ListElement;

ListElement.propTypes = {
  name: PropTypes.string.isRequired,
  editHandle: PropTypes.func.isRequired,
};
