import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/shared/forms/input';
import Textarea from 'components/shared/forms/textarea';
import FormTitle from 'components/shared/forms/form-title';
import FilesInput from 'components/shared/forms/files-input';

import { double, wrapper } from 'components/shared/modal/modal.module.scss';

const EditInfoForm = ({ formik, urls, setImages, setPhotoChanged }) => (
  <>
    <FormTitle text="about" />
    <Input
      name="userName"
      type="text"
      value={formik.values.userName}
      handleChange={formik.handleChange}
      error={
        formik.errors?.userName &&
        formik.touched?.userName &&
        formik.errors?.userName
      }
      placeholder="Insert your name"
      label="Name"
      isRequired
    />
    <FilesInput
      name="userPhoto"
      urls={urls}
      setImages={setImages}
      setPhotoChanged={setPhotoChanged}
      label="Upload your profile picture"
    />
    <Textarea
      name="userBio"
      value={formik.values.userBio}
      handleChange={formik.handleChange}
      error={
        formik.errors?.userBio &&
        formik.touched?.userBio &&
        formik.errors?.userBio
      }
      placeholder="Give a description of yourself"
      label="Bio"
      isRequired
    />
    <div className={double}>
      <Input
        name="userRole"
        type="text"
        value={formik.values.userRole}
        handleChange={formik.handleChange}
        error={
          formik.errors?.userRole &&
          formik.touched?.userRole &&
          formik.errors?.userRole
        }
        placeholder="Insert your job role"
        label="Role"
        isRequired
      />
      <Input
        name="userLocation"
        type="text"
        value={formik.values.userLocation}
        handleChange={formik.handleChange}
        error={
          formik.errors?.userLocation &&
          formik.touched?.userLocation &&
          formik.errors?.userLocation
        }
        placeholder="Insert your current location"
        label="Location"
      />
    </div>
    <div className={double}>
      <Input
        name="userEmail"
        type="text"
        value={formik.values.userEmail}
        handleChange={formik.handleChange}
        error={
          formik.errors?.userEmail &&
          formik.touched?.userEmail &&
          formik.errors?.userEmail
        }
        placeholder="Insert your e-mail"
        label="E-mail"
      />
      <Input
        name="userPhone"
        type="tel"
        value={formik.values.userPhone}
        handleChange={formik.handleChange}
        error={
          formik.errors?.userPhone &&
          formik.touched?.userPhone &&
          formik.errors?.userPhone
        }
        placeholder="Insert your phone number"
        label="Phone"
      />
    </div>
    <FormTitle text="social" />
    <div className={double}>
      <Input
        name="userBehance"
        type="text"
        value={formik.values.userBehance}
        handleChange={formik.handleChange}
        error={
          formik.errors?.userBehance &&
          formik.touched?.userBehance &&
          formik.errors?.userBehance
        }
        placeholder="Insert your behance account"
        label="Behance"
      />
      <Input
        name="userGitHub"
        type="text"
        value={formik.values.userGitHub}
        handleChange={formik.handleChange}
        error={
          formik.errors?.userGitHub &&
          formik.touched?.userGitHub &&
          formik.errors?.userGitHub
        }
        placeholder="Insert your gitHub account"
        label="GitHub"
      />
    </div>
    <div className={double}>
      <Input
        name="userLinkedIn"
        type="text"
        value={formik.values.userLinkedIn}
        handleChange={formik.handleChange}
        error={
          formik.errors?.userLinkedIn &&
          formik.touched?.userLinkedIn &&
          formik.errors?.userLinkedIn
        }
        placeholder="Insert your linkedIn account"
        label="LinkedIn"
      />
      <Input
        name="userInstagram"
        type="text"
        value={formik.values.userInstagram}
        handleChange={formik.handleChange}
        error={
          formik.errors?.userInstagram &&
          formik.touched?.userInstagram &&
          formik.errors?.userInstagram
        }
        placeholder="Insert your instagram account"
        label="Instagram"
      />
    </div>
    <div className={double}>
      <Input
        name="userTwitter"
        type="text"
        value={formik.values.userTwitter}
        handleChange={formik.handleChange}
        error={
          formik.errors?.userTwitter &&
          formik.touched?.userTwitter &&
          formik.errors?.userTwitter
        }
        placeholder="Insert twitter account"
        label="Twitter"
      />
      <Input
        name="userDribble"
        type="text"
        value={formik.values.userDribble}
        handleChange={formik.handleChange}
        error={
          formik.errors?.userDribble &&
          formik.touched?.userDribble &&
          formik.errors?.userDribble
        }
        placeholder="Insert your dribble account"
        label="Dribble"
      />
      </div>
      <FormTitle text="theme" />
      <label>Choose your favorite color</label>
      <div className={wrapper}>
        <div>
          <div></div>
          <input
            type="radio"
            name="userColor"
            onChange={formik.handleChange}
            value="green-theme"
            checked={formik?.values?.userColor === 'green-theme'}
          />
        </div>
        <div>
        <div></div>
          <input
            type="radio"
            name="userColor"
            onChange={formik.handleChange}
            value="pink-theme"
            checked={formik?.values?.userColor === 'pink-theme'}
          />
        </div>
        <div>
          <div></div>
          <input
            type="radio"
            name="userColor"
            onChange={formik.handleChange}
            value="yellow-theme"
            checked={formik?.values?.userColor === 'yellow-theme'}
          />
        </div>
        <div>
          <div></div>
          <input
            type="radio"
            name="userColor"
            onChange={formik.handleChange}
            value="blue-theme"
            checked={formik?.values?.userColor === 'blue-theme'}
          />
        </div>
        <div>
          <div></div>
          <input
            type="radio"
            name="userColor"
            onChange={formik.handleChange}
            value="orange-theme"
            checked={formik?.values?.userColor === 'orange-theme'}
          />
        </div>
      </div>
  </>
);

export default EditInfoForm;

EditInfoForm.propTypes = {
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
