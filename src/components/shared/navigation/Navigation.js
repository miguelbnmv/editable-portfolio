import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../elements/button/Button';

import { nav } from './navigation.module.scss';

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className={nav}>
      <Button handle={() => navigate('/home')} img="home" color="icon" />
      <Button
        handle={() => navigate('/projects')}
        img="projects"
        color="icon"
      />
      <Button
        handle={() => navigate('/experience')}
        img="experience"
        color="icon"
      />
      <Button handle={() => navigate('/')} img="settings" color="icon" />
    </nav>
  );
};

export default Header;
