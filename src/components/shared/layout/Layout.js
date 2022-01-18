import React from 'react';
import PropTypes from 'prop-types';

import Header from '../header';
import Navigation from '../navigation';

const Layout = ({ pageTitle, noFill, hide, children, openModal, hasId }) => (
  <>
    <Header
      pageTitle={pageTitle}
      noFill={noFill}
      hide={hide}
      openModal={openModal}
      hasId={hasId}
    />
    {children}
    <Navigation />
  </>
);

export default Layout;

Layout.propTypes = {
  pageTitle: PropTypes.string,
  noFill: PropTypes.bool,
  hide: PropTypes.bool,
  children: PropTypes.node,
  openModal: PropTypes.func,
  hasId: PropTypes.bool,
};
