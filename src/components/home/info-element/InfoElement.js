import React from 'react';
import PropTypes from 'prop-types';

import { wrapper } from './info-element.module.scss';

const InfoElement = ({ label, content }) => (
  <div className={wrapper}>
    <span>{label}</span>
    <span>{content}</span>
  </div>
);

export default InfoElement;

InfoElement.propTypes = {
  label: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
