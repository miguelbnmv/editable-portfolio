import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import FormTitle from 'components/shared/forms/form-title';
import ListElement from 'components/shared/forms/list-element';

import Data from 'assets/json/Experience.json';

const MyExperienceForm = ({ handle }) => {
  const navigate = useNavigate();
  let tempYear = '';

  const editHandle = (id) => {
    handle();
    navigate(`/experience?id=${id}`);
  };

  const addTitle = (date, year) => {
    tempYear = new Date(date).getFullYear();
    return <FormTitle text={'' + year} isList />;
  };

  return (
    <>
      {Data.map(({ name, id, date }) => {
        const year = new Date(date).getFullYear();

        return (
          <React.Fragment key={id}>
            {year === tempYear ? null : addTitle(date, year, id)}
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
