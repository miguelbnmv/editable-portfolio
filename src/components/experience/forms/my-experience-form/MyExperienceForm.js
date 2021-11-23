import React from 'react';

import FormTitle from '../../../shared/forms/form-title';
import ListElement from '../../../shared/forms/list-element';

const MyExperienceForm = () => (
  <>
    <FormTitle text="2019" isList />
    <ListElement name="Created my first" />
    <ListElement name="Started working at Amazon" />
    <FormTitle text="2020" isList />
    <ListElement name="Launched my product" />
  </>
);

export default MyExperienceForm;
