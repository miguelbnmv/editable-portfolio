import Layout from '../../components/shared/layout';
import Footer from '../../components/home/footer';
import { contentContainer, about, footer, imageGroup } from './home.module.scss'
import Icon1 from '../../assets/icons/Github.png';
import Icon2 from '../../assets/icons/Instagram.png';
import Icon3 from '../../assets/icons/Twitter.png';
import Kelvin from '../../assets/icons/Kelvin.png';


const Home = () => {
  return (
    <Layout pageTitle='Home' hide>
      <div className={contentContainer}>
          <div className={about}>
            <h1>Hello, I'm <span>Kelvin</span></h1>
            <h3>Frontend developer</h3>
            <p>A front-end developer at Redlight Software who loves to swim and wants to share his very good projects.</p>
            <br/>
            <button>Contact →</button>
            <br/>

            <ul>
              <a href="github"><img src={Icon1}/></a>
              <a href="instagram"><img src={Icon2}/></a>
              <a href="twitter"><img src={Icon3}/></a>
            </ul>
        </div>
        <div className={imageGroup}>
          <div>
            <img src={Kelvin}/>
            <div></div>
          </div>
        </div>
        <div className={footer}>
          <Footer label="E-mail" content="miguelbnmv@redlight.dev"/>
          <Footer label="Phone" content="+351 911 010 123"/>
          <Footer label="Location" content="Rome"/>
        </div>
      </div>
    </Layout>
  )
}

export default Home;