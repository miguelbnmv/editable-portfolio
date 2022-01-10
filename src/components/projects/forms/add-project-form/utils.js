import * as Yup from 'yup';

export const initialValues = (project) => ({
  projectTitle: project?.title ?? '',
  projectQuote: project?.quote ?? '',
  projectFirstDescriptionTitle: project?.firstDescriptionTitle ?? '',
  projectFirstDescription: project?.firstDescription ?? '',
  projectSecondDescriptionTitle: project?.secondDescriptionTitle ?? '',
  projectSecondDescription: project?.secondDescription ?? '',
  projectSubject: project?.subject ?? '',
  projectDate: project?.date ?? '',
  projectPlatforms: project?.platforms ?? '',
  projectTechnologies: project?.technologies ?? '',
  projectImages: project?.images ?? '',
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
