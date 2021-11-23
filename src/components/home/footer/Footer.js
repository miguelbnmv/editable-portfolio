import { footer } from './footer.module.scss'

const Footer = ({ label, content }) => {
  return (
    <div className={footer}>
      <span>{label}</span>
      <span>{content}</span>
    </div>
  )
}

export default Footer;