import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header';

const Layout = ({ pageTitle, noFill, hide, children, openModal }) => (
  <>
    <Header pageTitle={pageTitle} noFill={noFill} hide={hide} openModal={openModal} />
    {children}
  </>
);

export default Layout;

Layout.propTypes = {
  pageTitle: PropTypes.string,
  noFill: PropTypes.bool,
  hide: PropTypes.bool,
  children: PropTypes.node,
  openModal: PropTypes.func,
};
