import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import close from '../../../assets/icons/close.svg';

import {
  background,
  modal,
  header,
  content,
  footer,
  submit,
  white,
  link,
} from './modal.module.scss';

const Modal = ({
  children,
  title,
  isSubmit,
  onChange,
  footerContent,
  isSubmitting,
}) => {
  const [isMaxHeight, setIsMaxHeight] = useState(false);

  useEffect(() => {
    const contentHeight = document.getElementById('content')?.offsetHeight;
    contentHeight >= 528 ? setIsMaxHeight(true) : setIsMaxHeight(false);
  }, []);

  return (
    <div className={background}>
      <div className={modal}>
        <div className={header}>
          <h3>{title}</h3>
          <button onClick={onChange}>
            <img alt="Close Icon" src={close} />
          </button>
        </div>
        <div id="content" className={content}>
          {children}
        </div>
        <div
          className={footer}
          style={{
            boxShadow: isMaxHeight
              ? '0 -0.25rem 2.5rem 0.5rem rgba(0, 0, 0, 0.25)'
              : null,
          }}
        >
          <input
            type="submit"
            className={`${submit} ${!isSubmit ? white : null}`}
            value={isSubmit ? 'Submit' : 'Add'}
            disabled={isSubmitting}
          />
          {footerContent ? <span className={link}>{footerContent}</span> : null}
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  isSubmit: PropTypes.bool,
  onChange: PropTypes.func,
  footerContent: PropTypes.node,
  initialValues: PropTypes.object,
};
