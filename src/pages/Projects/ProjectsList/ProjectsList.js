import Layout from '../../../components/shared/layout/Layout';
import ProjectCard from '../../../components/projects/projectCard/ProjectCard';

import {contentContainer} from './projects-list.module.scss';

const Projects = () => {
  return (
    <Layout>
      <div className={contentContainer}>
        <ProjectCard/>
      </div>
    </Layout>
  )
}

export default Projects;