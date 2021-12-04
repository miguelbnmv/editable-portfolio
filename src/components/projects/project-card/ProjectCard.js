import React from 'react';
import { useNavigate } from 'react-router-dom';
import Ticker from 'react-ticker';

import useMousePosition from './useMousePosition';
import { card } from './project-card.module.scss';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const position = useMousePosition();

  return (
    <Ticker mode="chain" speed={2}>
      {() => (
        <div className={card} key={project.id}>
          <button onClick={() => navigate(`/projects/${project.id}`)}>
            {project.name}.{' '}
          </button>
          <img
            src={project.banner}
            alt="project-banner"
            style={{ left: position.x + 'px', top: position.y + 'px' }}
          />
        </div>
      )}
    </Ticker>
  );
};

export default ProjectCard;
