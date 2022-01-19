import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Context } from 'context/userContext';

import FormTitle from 'components/shared/forms/form-title';
import ListElement from 'components/shared/forms/list-element';

const MyExperienceForm = ({ editHandler, removeHandler }) => {
  const user = useContext(Context);
  const experiences = user?.info?.experiences;

  let currentYear = '';

  const addTitle = (date, year) => {
    currentYear = new Date(date).getFullYear();
    return <FormTitle text={'' + year} isList />;
  };

  if (!experiences) return <span>Não tem experiências</span>; //melhorar design

  return (
    <>
      {Object.entries(experiences).map((exp) => {
        const year = new Date(exp[1].date).getFullYear();

        return (
          <React.Fragment key={exp[0]}>
            {year === currentYear ? null : addTitle(exp[1].date, year, exp[0])}
            <ListElement
              name={exp[1].name}
              editHandle={() => editHandler(true, exp)}
              removeHandle={() => removeHandler(exp[0])}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default MyExperienceForm;

MyExperienceForm.propTypes = {
  editHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired,
};
