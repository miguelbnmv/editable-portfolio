import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/shared/elements/button';

import { background, header, content, footer, link } from './modal.module.scss';

const Modal = ({
  children,
  title,
  handleButton,
  handleClose,
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
      <aside>
        <div className={header}>
          <h3>{title}</h3>
          <Button handle={handleClose} img="close" color="icon" />
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
          <Button
            type={!handleButton ? 'submit' : 'button'}
            handle={handleButton ? handleButton : null}
            color={!handleButton ? 'green' : 'white'}
            text={!handleButton ? 'Submit' : 'Add'}
            disabled={isSubmitting}
          />
          {footerContent ? <span className={link}>{footerContent}</span> : null}
        </div>
      </aside>
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
