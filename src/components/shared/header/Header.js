import {header} from './header.module.scss'
const Header = () => {
  return (
      <header className={header}>
        <ul>
          <li><a href='/'>Home</a></li>
          <li><a href='/projects'>Projects</a></li>
          <li><a href='/experience'>Experience</a></li>
        </ul>
      </header>
  )
}

export default Header;