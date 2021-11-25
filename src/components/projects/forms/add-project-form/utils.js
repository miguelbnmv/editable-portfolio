import * as Yup from 'yup';

export const initialValues = (project) => ({
  projectTitle: project?.name ?? '',
  projectDescription: project?.primaryDescription.description ?? '',
  projectSubject: project?.about.subject ?? '',
  projectDate: project?.about.year ?? '',
  projectPlatforms: project?.about.platforms ?? '',
  projectTechnologies: project?.about.technologies ?? '',
  projectImages: project?.description ?? '',
});

export const addProjectFormSchema = Yup.object().shape({
  projectTitle: Yup.string().required('Required'),
  projectDescription: Yup.string().required('Required'),
  projectDate: Yup.date(),
});
