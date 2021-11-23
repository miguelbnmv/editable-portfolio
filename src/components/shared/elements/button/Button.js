import PropTypes from 'prop-types';

import left from '../../../../assets/icons/left.svg';
import right from '../../../../assets/icons/right.svg';

import {
  button,
  green,
  white,
  borderless,
  red,
  close,
} from './button.module.scss';

var classes = {
  green: green,
  red: red,
  white: white,
  borderless: borderless,
  close: close,
};

var icons = {
  left: left,
  right: right,
};

const Button = ({
  color,
  handle,
  path,
  img,
  text,
  type = 'button',
  disabled,
}) => {
  return (
    <>
      <a href={path}>
        <button
          onClick={handle}
          type={type}
          className={`${button} ${classes[color]}`}
          disabled={disabled}
        >
          {img ? <img src={icons[img]} alt={img} width={28} /> : ''}
          <span>{text}</span>
        </button>
      </a>
    </>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  handle: PropTypes.func,
  path: PropTypes.string,
  img: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Button;
