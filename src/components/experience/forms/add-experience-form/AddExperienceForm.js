import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/shared/forms/input';
import FilesInput from 'components/shared/forms/files-input';

const AddExperienceForm = ({ formik, urls, setImages, setPhotoChanged }) => (
  <>
    <Input
      name="experienceTitle"
      type="text"
      value={formik.values.experienceTitle}
      handleChange={formik.handleChange}
      error={
        formik.errors?.experienceTitle &&
        formik.touched?.experienceTitle &&
        formik.errors?.experienceTitle
      }
      placeholder="Insert the title of your milestone"
      label="Title"
      isRequired
    />
    <Input
      name="experienceDate"
      type="date"
      value={formik.values.experienceDate}
      handleChange={formik.handleChange}
      error={
        formik.errors?.experienceDate &&
        formik.touched?.experienceDate &&
        formik.errors?.experienceDate
      }
      placeholder="--/--/--"
      label="Date"
      isRequired
    />
    <FilesInput
      name="experienceImage"
      label="Upload your experience's image (1 max)"
      urls={urls}
      setImages={setImages}
      setPhotoChanged={setPhotoChanged}
    />
  </>
);

export default AddExperienceForm;

AddExperienceForm.propTypes = {
  formik: PropTypes.shape({
    values: PropTypes.object,
    handleChange: PropTypes.func,
    errors: PropTypes.object,
    touched: PropTypes.object,
  }),
  urls: PropTypes.array,
  setImages: PropTypes.func,
  setPhotoChanged: PropTypes.func,
};
