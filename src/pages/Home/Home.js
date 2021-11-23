import Layout from '../../components/shared/layout';
import Footer from '../../components/home/footer';
import { contentContainer } from './home.module.scss'

const Home = () => {
  return (
    <Layout pageTitle='Home' hide>
      <div className={contentContainer}>
      </div>
      <Footer />
    </Layout>
  )
}

export default Home;