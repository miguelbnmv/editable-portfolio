import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Context } from 'context/userContext';

import ListElement from 'components/shared/forms/list-element';

const MyProjectsForm = ({ handle }) => {
  const navigate = useNavigate();
  const { projects } = useContext(Context);

  const editHandle = (id) => {
    handle();
    navigate(`/projects?id=${id}`);
  };

  return (
    <>
      {projects.map(({ name, id }) => (
        <ListElement name={name} key={id} editHandle={() => editHandle(id)} />
      ))}
    </>
  );
};

export default MyProjectsForm;

MyProjectsForm.propTypes = {
  handle: PropTypes.func.isRequired,
};