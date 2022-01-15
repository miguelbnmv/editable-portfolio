import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/shared/elements/button/Button';

import { input, imgContainer, placeHolder, addMore } from './files-input.module.scss';

const FilesInput = ({ label, name, urls, setImages, multiple }) => {
  const handleChange = (e) => {
    for (let i = 0; i < e?.target?.files.length; i++) {
      const newImage = e?.target?.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  console.log(urls.length);

  return (
    <div className={input}>
      <label htmlFor={name}>
        {urls === '' ? <div>{label}</div> : null}
        <div className={imgContainer}>
          {urls?.map((url, i) => (
            <div key={i} className={placeHolder}>
              <img src={url} alt="Firebase" />
              <Button img="close" color="icon" />
            </div>
          ))}
          {multiple && urls.length <= 4? (
          <div className={`${placeHolder} ${addMore}`}>
            <span>+</span>
          </div>
          ) : null}
        </div>
      </label>
      <input id={name} onChange={handleChange} multiple={multiple} type="file" />
    </div>
  );
};

export default FilesInput;

FilesInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
};