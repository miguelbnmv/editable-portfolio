import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/shared/forms/input';
import Textarea from 'components/shared/forms/textarea';
import FilesInput from 'components/shared/forms/files-input';

import { double } from 'components/shared/modal/modal.module.scss';

const AddProjectForm = ({ formik }) => (
  <>
    <Input
      name="projectTitle"
      type="text"
      value={formik.values.projectTitle}
      handleChange={formik.handleChange}
      error={
        formik.errors?.projectTitle &&
        formik.touched?.projectTitle &&
        formik.errors?.projectTitle
      }
      placeholder="Insert the title of your project"
      label="Title"
      isRequired
    />
    <Textarea
      name="projectDescription"
      value={formik.values.projectDescription}
      handleChange={formik.handleChange}
      error={
        formik.errors?.projectDescription &&
        formik.touched?.projectDescription &&
        formik.errors?.projectDescription
      }
      placeholder="Give a description to your project"
      label="Description"
      isRequired
    />
    <div className={double}>
      <Input
        name="projectSubject"
        type="text"
        value={formik.values.projectSubject}
        handleChange={formik.handleChange}
        error={
          formik.errors?.projectSubject &&
          formik.touched?.projectSubject &&
          formik.errors?.projectSubject
        }
        placeholder="What is your project about?"
        label="Subject"
      />
      <Input
        name="projectDate"
        type="date"
        value={formik.values.projectDate}
        handleChange={formik.handleChange}
        error={
          formik.errors?.projectDate &&
          formik.touched?.projectDate &&
          formik.errors?.projectDate
        }
        placeholder="--/--/--"
        label="Date"
      />
    </div>
    <div className={double}>
      <Input
        name="projectPlatforms"
        type="text"
        value={formik.values.projectPlatforms}
        handleChange={formik.handleChange}
        error={
          formik.errors?.projectPlatforms &&
          formik.touched?.projectPlatforms &&
          formik.errors?.projectPlatforms
        }
        placeholder="Where can we use it?"
        label="Platforms"
      />
      <Input
        name="projectTechnologies"
        type="text"
        value={formik.values.projectTechnologies}
        handleChange={formik.handleChange}
        error={
          formik.errors?.projectTechnologies &&
          formik.touched?.projectTechnologies &&
          formik.errors?.projectTechnologies
        }
        placeholder="What did you use for it?"
        label="Technologies"
      />
    </div>
    <FilesInput name="projectImages" label="Upload images (4 max)" />
  </>
);

export default AddProjectForm;

AddProjectForm.propTypes = {
  formik: PropTypes.shape({
    values: PropTypes.object,
    handleChange: PropTypes.func,
    errors: PropTypes.object,
    touched: PropTypes.object,
  }),
};
