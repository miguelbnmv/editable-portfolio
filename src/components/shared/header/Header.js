import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Button from '../elements/button/Button';

import {
  header,
  headerTransparent,
  hideHeader,
  btnWrapper,
  pageInfo,
} from './header.module.scss';

const navigation = {
  Home: ['experience', 'projects'],
  Projects: ['home', 'experience'],
  Experience: ['projects', 'home'],
};

const Header = ({ pageTitle, noFill, hide, openModal }) => {
  const navigate = useNavigate();

  const getTitle = (index) => {
    if (noFill) return 'Projects';
    return navigation[pageTitle] ? navigation[pageTitle][index] : pageTitle;
  };

  const getPath = (index) => {
    if (noFill) return '/projects';
    return navigation[pageTitle][index] === 'home'
      ? '/'
      : '/' + navigation[pageTitle][index];
  };

  return (
    <header
      className={`${header} ${
        noFill ? headerTransparent : hide ? hideHeader : null
      }`}
    >
      <div className={btnWrapper}>
        <Button
          handle={() => navigate(getPath(0))}
          text={getTitle(0)}
          img="left"
          color="borderless"
        />
        {!noFill ? (
          <Button
            handle={() => navigate(getPath(1))}
            text={getTitle(1)}
            img="right"
            color="borderless"
          />
        ) : null}
      </div>
      <div className={pageInfo}>
        {!hide ? (
          <h1>
            {pageTitle}
            <span>.</span>
          </h1>
        ) : null}
        <Button handle={openModal} text="Edit" color="white" />
      </div>
    </header>
  );
};

Header.propTypes = {
  pageTitle: PropTypes.string,
  noFill: PropTypes.bool,
  hide: PropTypes.bool,
  openModal: PropTypes.func,
};

export default Header;
