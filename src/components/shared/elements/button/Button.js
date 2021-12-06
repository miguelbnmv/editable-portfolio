import React from 'react';
import PropTypes from 'prop-types';

import leftIcon from 'assets/icons/left.svg';
import rightIcon from 'assets/icons/right.svg';
import closeIcon from 'assets/icons/close.svg';
import projectsIcon from 'assets/icons/projects.svg';
import experienceIcon from 'assets/icons/experience.svg';
import homeIcon from 'assets/icons/home.svg';

import {
  button,
  green,
  red,
  white,
  borderless,
  icon,
} from './button.module.scss';

var classes = {
  green: green,
  red: red,
  white: white,
  borderless: borderless,
  icon: icon,
};

var icons = {
  left: leftIcon,
  right: rightIcon,
  close: closeIcon,
  projects: projectsIcon,
  experience: experienceIcon,
  home: homeIcon,
};

const Button = ({ color, handle, img, text, type = 'button', disabled }) => {
  return (
    <button
      type={type}
      className={`${button} ${color ? classes[color] : ''}`}
      onClick={handle}
      disabled={disabled}
    >
      {img ? <img src={icons[img]} alt={img} width={28} /> : ''}
      <span>{text}</span>
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  handle: PropTypes.func,
  img: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
