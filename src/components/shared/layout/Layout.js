import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header';
import { appWrapper } from './layout.module.scss';

const Layout = ({ pageTitle, noFill, hide, children }) => {
  return (
    <div className={appWrapper}>
      <Header pageTitle={pageTitle} noFill={noFill} hide={hide}/>
      {children}
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  pageTitle: PropTypes.string,
  noFill: PropTypes.bool,
  hide: PropTypes.bool,
  children: PropTypes.node,
};
