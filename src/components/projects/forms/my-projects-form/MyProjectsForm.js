import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import ListElement from 'components/shared/forms/list-element';

import Data from 'assets/json/Projects.json';

const MyProjectsForm = ({ handle }) => {
  const navigate = useNavigate();

  const editHandle = (id) => {
    handle();
    navigate(`/projects?id=${id}`);
  };

  return (
    <>
      {Data.map(({ name, id }) => (
        <ListElement name={name} key={id} editHandle={() => editHandle(id)} />
      ))}
    </>
  );
};

export default MyProjectsForm;

MyProjectsForm.propTypes = {
  handle: PropTypes.func.isRequired,
};