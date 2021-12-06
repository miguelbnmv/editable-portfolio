import React, { useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { isActive } from 'pages/projects/projects-list/projects-list.module.scss';

const getDimensionObject = (node) => {
  const rect = node.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
  };
};

const useSize = () => {
  const [dimensions, setDimensions] = useState({});
  const [node, setNode] = useState(null);

  const ref = useCallback((node) => {
    setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = () => setDimensions(getDimensionObject(node));
      measure();
    }
  }, [node]);

  return [ref, dimensions];
};

const ProjectImage = ({ url, active, x, y }) => {
  const [ref, { width, height }] = useSize();

  return (
    <img
      className={active ? isActive : null}
      ref={ref}
      src={url}
      alt="project banner"
      style={{
        transform: `translate(${x - width / 2}px, ${y - height / 2}px)`,
      }}
    />
  );
};

export default ProjectImage;

ProjectImage.propTypes = {
  url: PropTypes.string.isRequired,
  active: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number,
};