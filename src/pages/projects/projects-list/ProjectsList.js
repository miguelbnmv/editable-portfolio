import Layout from '../../../components/shared/layout/Layout';
import ProjectCard from '../../../components/projects/project-card';

import Data from '../../../assets/json/Projects.json';

import { contentContainer } from './projects-list.module.scss';

const ProjectsList = () => (
  <Layout pageTitle="Projects">
    <div className={contentContainer}>
      {Data.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  </Layout>
);

export default ProjectsList;
