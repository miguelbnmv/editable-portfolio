import { useParams } from 'react-router-dom';
import Masonry from 'react-masonry-css';

import Data from '../../../assets/json/Projects.json';

import {
  contentContainer,
  hero,
  main,
  primaryDescription,
  primaryDescriptionContent,
  about, aboutCategory,
  secondaryDescription,
  secondaryDescriptionContent,
  gallery,
  myMasonryGrid,
  myMasonryGridColumn,
} from './project.module.scss';

const Project = () => {
  const { projectId } = useParams();
  const project = Data.find(({ id }) => id === parseInt(projectId));

  const breakpointColumnsObj = {
    default: 2,
    800: 1,
  };

  return (
    <div className={contentContainer}>

      <div className={hero}>
        <img src={project.banner} alt='project-banner' />
        <h1>{project.name}. {project.name}.</h1>
      </div>

      <div className={main}>

        <div className={primaryDescription}>
          <div className={primaryDescriptionContent}>
            <h3>{project.primaryDescription.title}</h3>
            <p>{project.primaryDescription.description}</p>
            <h1>"{project.quote}"</h1>
          </div>

          <div className={about}>
            <div className={aboutCategory}>
              <span>Subject</span>
              <span>{project.about.subject}</span>
            </div>
            <div className={aboutCategory}>
              <span>Platforms</span>
              <span>{project.about.platforms}</span>
            </div>
            <div className={aboutCategory}>
              <span>Technologies</span>
              <span>{project.about.technologies}</span>
            </div>
            <div className={aboutCategory}>
              <span>Year</span>
              <span>{project.about.year}</span>
            </div>
          </div>

          <img src={project.primaryDescription.image} alt='description-illustration' />
        </div>

        <div className={secondaryDescription}>
          <img src={project.secondaryDescription.image} alt='description-illustration'/>
          <div className={secondaryDescriptionContent}>
            <h3>{project.secondaryDescription.title}</h3>
            <p>{project.secondaryDescription.description}</p>
          </div>
        </div>

        <div className={gallery}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={myMasonryGrid}
            columnClassName={myMasonryGridColumn}
          >
            <img src={project.gallery.img0} alt='project-img' />
            <img src={project.gallery.img1} alt='project-img' />
            <img src={project.gallery.img2} alt='project-img' />
            <img src={project.gallery.img3} alt='project-img' />
            <img src={project.gallery.img4} alt='project-img' />
          </Masonry>
        </div>

      </div>
    </div>
  )
}

export default Project;
