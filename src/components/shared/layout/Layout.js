import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header';
import { appWrapper } from './layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={appWrapper}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node,
};
