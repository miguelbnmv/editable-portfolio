import React from 'react';
import Ticker from 'react-ticker';
import { useNavigate } from 'react-router-dom';

import Button from 'components/shared/elements/button';

import { card } from './project-card.module.scss';

const ProjectCard = ({ project, setActiveIndex, index }) => {
  const navigate = useNavigate();

  return (
    <Ticker mode="chain" speed={2}>
      {() => (
        <div
          className={card}
          key={project.id}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(-1)}
        >
          <Button
            text={' ' + project.name + '.'}
            handle={() => navigate(`/projects/${project.id}`)}
          />
        </div>
      )}
    </Ticker>
  );
};

export default ProjectCard;
