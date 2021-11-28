import * as Yup from 'yup';

export const initialValues = (project) => ({
  projectTitle: project?.name ?? '',
  projectQuote: project?.quote ?? '',
  projectFirstDescriptionTitle: project?.primaryDescription.title ?? '',
  projectFirstDescription: project?.primaryDescription.description ?? '',
  projectSecondDescriptionTitle: project?.secondaryDescription.title ?? '',
  projectSecondDescription: project?.secondaryDescription.description ?? '',
  projectSubject: project?.about.subject ?? '',
  projectDate: project?.about.year ?? '',
  projectPlatforms: project?.about.platforms ?? '',
  projectTechnologies: project?.about.technologies ?? '',
  projectImages: project?.description ?? '',
});

export const addProjectFormSchema = Yup.object().shape({
  projectTitle: Yup.string().required('Required'),
  projectQuote: Yup.string().required('Required'),
  projectFirstDescriptionTitle: Yup.string().required('Required'),
  projectFirstDescription: Yup.string().required('Required'),
  projectSecondDescriptionTitle: Yup.string().required('Required'),
  projectSecondDescription: Yup.string().required('Required'),
  projectDate: Yup.date(),
});
