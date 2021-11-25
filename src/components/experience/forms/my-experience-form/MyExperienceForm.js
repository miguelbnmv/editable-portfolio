import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Context } from 'context/userContext';

import FormTitle from 'components/shared/forms/form-title';
import ListElement from 'components/shared/forms/list-element';

const MyExperienceForm = ({ handle }) => {
  const navigate = useNavigate();
  const { experiences } = useContext(Context);

  let currentYear = '';

  const editHandle = (id) => {
    handle();
    navigate(`/experience?id=${id}`);
  };

  const addTitle = (date, year) => {
    currentYear = new Date(date).getFullYear();
    return <FormTitle text={'' + year} isList />;
  };

  return (
    <>
      {experiences.map(({ name, id, date }) => {
        const year = new Date(date).getFullYear();

        return (
          <React.Fragment key={id}>
            {year === currentYear ? null : addTitle(date, year, id)}
            <ListElement name={name} editHandle={() => editHandle(id)} />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default MyExperienceForm;

MyExperienceForm.propTypes = {
  handle: PropTypes.func.isRequired,
};
