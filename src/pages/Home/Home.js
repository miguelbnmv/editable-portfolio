import Layout from '../../components/shared/layout';
import { contentContainer } from './home.module.scss'

const Home = () => {
  return (
    <Layout>
      <div className={contentContainer}>
        <h1>Home.</h1>
      </div>
    </Layout>
  )
}

export default Home;