import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Context } from 'context/userContext';

import ListElement from 'components/shared/forms/list-element';

const MyProjectsForm = ({ editHandler, removeHandler }) => {
  const user = useContext(Context);
  const projects = user?.info?.projects;

  if (!projects) return <span>Não tem projetos</span>; //melhorar design

  return (
    <>
      {Object.entries(projects).map((project) => (
        <ListElement
          name={project[1].title}
          key={project[0]}
          editHandle={() => editHandler(true, project)}
          removeHandle={() => removeHandler(project[0])}
        />
      ))}
    </>
  );
};

export default MyProjectsForm;

MyProjectsForm.propTypes = {
  editHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired,
};
