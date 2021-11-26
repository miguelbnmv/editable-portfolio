import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Ticker from 'react-ticker';
import { gsap } from 'gsap';

import Button from 'components/shared/elements/button';

import { card, cursorFollow } from './project-card.module.scss';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  let tl = gsap.timeline();
  let cursor = useRef(null);
  let mouseX = 0;
  let mouseY = 0;

  useEffect(() => {
    tl.to({}, 0.016, {
      repeat: -1,
      onRepeat: function () {
        tl.set(cursor, {
          css: {
            left: mouseX - 480,
            top: mouseY - 480,
          },
        });
      },
    });
    document.addEventListener('mousemove', function (e) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mouseX = e.pageX;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mouseY = e.pageY;
    });
  });

  return (
    <>
      <Ticker mode="chain" speed={2}>
        {() => (
          <div className={card} key={project.id}>
            <Button
              text={' ' + project.name + '.'}
              handle={() => navigate(`/projects/${project.id}`)}
            />
          </div>
        )}
      </Ticker>
      <div className={cursorFollow} ref={(el) => (cursor = el)}></div>
    </>
  );
};

export default ProjectCard;
