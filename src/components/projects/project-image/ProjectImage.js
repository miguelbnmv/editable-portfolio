import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ref as sRef, getDownloadURL } from 'firebase/storage';

import ProjectsPlaceholder from 'assets/images/ExperiencePlaceholder.png';
import { storage } from 'firebase/firebase.js';

import { isActive } from 'pages/projects/projects-list/projects-list.module.scss';

const ProjectImage = ({ project, active, x, y }) => {
  const imageRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [refSrc, setRefSrc] = useState(null);

  if (project[1]?.images) {
    getDownloadURL(sRef(storage, project[1]?.images[0])).then((url) => {
      setRefSrc(url);
    });
  }

  const onImgLoad = ({ target: img }) => {
    setWidth(img.offsetWidth);
    setHeight(img.offsetHeight);
  };

  return (
    <img
      className={active ? isActive : null}
      ref={imageRef}
      src={refSrc ?? ProjectsPlaceholder}
      alt="project banner"
      onLoad={onImgLoad}
      style={{
        transform: `translate(${x - width / 2}px, ${y - height / 2}px)`,
      }}
    />
  );
};

export default ProjectImage;

ProjectImage.propTypes = {
  project: PropTypes.array.isRequired,
  active: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number,
};
