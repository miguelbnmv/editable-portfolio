import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Context } from 'context/userContext';

import ListElement from 'components/shared/forms/list-element';

const MyProjectsForm = ({ editHandler, removeHandler }) => {
  const navigate = useNavigate();
  const user = useContext(Context);
  const projects = user?.info?.projects;

  const editHandle = (id) => {
    editHandler();
    navigate(`/projects?id=${id}`);
  };

  if (!projects) return <span>Não tem projetos</span>; //melhorar design

  return (
    <>
      {Object.entries(projects).map((project) => (
        <ListElement
          name={project[1].title}
          key={project[0]}
          editHandle={() => editHandle(project[0])}
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
