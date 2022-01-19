import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/shared/forms/input';
import Textarea from 'components/shared/forms/textarea';
import FilesInput from 'components/shared/forms/files-input';
import FormTitle from 'components/shared/forms/form-title';

import { double } from 'components/shared/modal/modal.module.scss';

const AddProjectForm = ({ formik, urls, setImages, setPhotoChanged }) => (
  <>
    <FormTitle text="general" />
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
    <Input
      name="projectQuote"
      type="text"
      value={formik.values.projectQuote}
      handleChange={formik.handleChange}
      error={
        formik.errors?.projectQuote &&
        formik.touched?.projectQuote &&
        formik.errors?.projectQuote
      }
      placeholder="Insert the quote of your project"
      label="Quote"
      isRequired
    />
    <FormTitle text="first description" />
    <Input
      name="projectFirstDescriptionTitle"
      type="text"
      value={formik.values.projectFirstDescriptionTitle}
      handleChange={formik.handleChange}
      error={
        formik.errors?.projectFirstDescriptionTitle &&
        formik.touched?.projectFirstDescriptionTitle &&
        formik.errors?.projectFirstDescriptionTitle
      }
      placeholder="Insert the title of the first description"
      label="Title"
      isRequired
    />
    <Textarea
      name="projectFirstDescription"
      value={formik.values.projectFirstDescription}
      handleChange={formik.handleChange}
      error={
        formik.errors?.projectFirstDescription &&
        formik.touched?.projectFirstDescription &&
        formik.errors?.projectFirstDescription
      }
      placeholder="Give an initial description of your project"
      label="Description"
      isRequired
    />
    <FormTitle text="second description" />
    <Input
      name="projectSecondDescriptionTitle"
      type="text"
      value={formik.values.projectSecondDescriptionTitle}
      handleChange={formik.handleChange}
      error={
        formik.errors?.projectSecondDescriptionTitle &&
        formik.touched?.projectSecondDescriptionTitle &&
        formik.errors?.projectSecondDescriptionTitle
      }
      placeholder="Insert the title of the second description"
      label="Title"
      isRequired
    />
    <Textarea
      name="projectSecondDescription"
      value={formik.values.projectSecondDescription}
      handleChange={formik.handleChange}
      error={
        formik.errors?.projectSecondDescription &&
        formik.touched?.projectSecondDescription &&
        formik.errors?.projectSecondDescription
      }
      placeholder="Give a final description of your project"
      label="Description"
      isRequired
    />
    <FormTitle text="about" />
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
    <FormTitle text="gallery" />
    <FilesInput
      name="projectImages"
      isMultiple
      urls={urls}
      setImages={setImages}
      setPhotoChanged={setPhotoChanged}
      label="Upload images (8 max)"
    />
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
  urls: PropTypes.array,
  setImages: PropTypes.func,
  setPhotoChanged: PropTypes.func,
};
