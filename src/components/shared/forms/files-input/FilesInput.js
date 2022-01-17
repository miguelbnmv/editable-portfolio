import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/shared/elements/button/Button';

import {
  input,
  imgContainer,
  placeholder,
  addMore,
} from './files-input.module.scss';

const FilesInput = ({
  label,
  name,
  urls,
  setImages,
  setPhotoChanged,
  isMultiple,
}) => {
  const [fileUrls, setFileUrls] = useState(urls);

  const handleChange = (e) => {
    setImages([]);
    setFileUrls([]);
    setPhotoChanged(true);
    for (let i = 0; i < e?.target?.files.length; i++) {
      const newImage = e?.target?.files[i];
      newImage['id'] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
      setFileUrls((prevState) => [...prevState, e?.target?.files[i]]);
    }
  };

  const removeImage = () => {
    setFileUrls([]);
    setImages([]);
    setPhotoChanged(true);
  };

  return (
    <div className={input}>
      <label htmlFor={name}>
        <div className={imgContainer}>
          {fileUrls?.length === 0 ? <div>{label}</div> : null}
          {fileUrls?.map((url, i) => (
            <div key={i} className={placeholder}>
              <img
                src={typeof url !== 'string' ? URL.createObjectURL(url) : url}
                alt="Firebase Content"
              />
              <Button img="close" color="icon" handle={() => removeImage()} />
            </div>
          ))}
          {isMultiple && fileUrls?.length < 9 ? (
            <div className={`${placeholder} ${addMore}`}>
              <span>+</span>
            </div>
          ) : null}
        </div>
      </label>
      <input
        id={name}
        onChange={handleChange}
        multiple={isMultiple}
        type="file"
      />
    </div>
  );
};

export default FilesInput;

FilesInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  isMultiple: PropTypes.bool,
};
