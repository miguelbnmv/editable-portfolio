import Layout from '../../components/shared/layout';
import InfoElement from '../../components/home/info-element';

import Icon1 from '../../assets/icons/Github.png';
import Icon2 from '../../assets/icons/Instagram.png';
import Icon3 from '../../assets/icons/Twitter.png';
import Kelvin from '../../assets/images/Kelvin.png';

import {
  contentContainer,
  about,
  footer,
  imageGroup,
} from './home.module.scss';

const Home = () => {
  return (
    <Layout pageTitle="Home" hide>
      <div className={contentContainer}>
        <div className={about}>
          <h1>
            Hello, I'm <span>Kelvin</span>
          </h1>
          <h3>Frontend developer</h3>
          <p>
            A front-end developer at Redlight Software who loves to swim and
            wants to share his very good projects.
          </p>
          <br />
          <button>Contact →</button>
          <br />

          <ul>
            <a href="github">
              <img src={Icon1} alt="Github icon" />
            </a>
            <a href="instagram">
              <img src={Icon2} alt="Instagram icon" />
            </a>
            <a href="twitter">
              <img src={Icon3} alt="Twitter icon" />
            </a>
          </ul>
        </div>
        <div className={imageGroup}>
          <div>
            <img src={Kelvin} alt="Placeholder" />
            <div></div>
          </div>
        </div>
        <div className={footer}>
          <InfoElement label="E-mail" content="miguelbnmv@redlight.dev" />
          <InfoElement label="Phone" content="+351 911 010 123" />
          <InfoElement label="Location" content="Rome" />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
