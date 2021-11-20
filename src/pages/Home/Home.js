import Layout from '../../components/shared/layout';
import Footer from '../../components/home/footer';
import { contentContainer } from './home.module.scss'

const Home = () => {
  return (
    <Layout>
      <div className={contentContainer}>
        <h1>Home.</h1>
      </div>
      <Footer />
    </Layout>
  )
}

export default Home;