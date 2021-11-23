import PropTypes from 'prop-types';

import Button from  '../elements/button/Button'

import {header, headerTransparent, hideHeader, btnWrapper, pageInfo} from './header.module.scss'

const Header = ({ pageTitle , noFill, hide}) => {

  return (
      <header className={`${header} ${noFill? headerTransparent : hide ? hideHeader : null}`}>
        <div className={btnWrapper}>
          <Button
            path={
              pageTitle === 'Home' ? '/experience' : pageTitle === 'Projects' ? '/' : '/projects'
            }
            text={
              pageTitle === 'Home' ? 'Experience' : pageTitle === 'Projects' ? 'Home' : 'Projects'
            }
            img='left'
            color='borderless'/>
          <Button
            path={
              pageTitle === 'Home' ? '/projects' : pageTitle === 'Projects' ? '/experience' : '/'
            }
            text={
              pageTitle === 'Home' ? 'Projects' : pageTitle === 'Projects' ? 'Experience' : 'Home'
            }
            img='right'
            color='borderless'/>
        </div>
        <div className={pageInfo}>
          <h1>{pageTitle}<span>.</span></h1>
        </div>
      </header>
  )
}

Header.propTypes = {
  pageTitle: PropTypes.string,
  noFill: PropTypes.bool,
  hide: PropTypes.bool,
};

export default Header;