import * as Yup from 'yup';

export const initialValues = {
  projectTitle: '',
  projectDescription: '',
  projectSubject: '',
  projectDate: '',
  projectPlatforms: '',
  projectTechnologies: '',
  projectImages: '',
};

export const addProjectFormSchema = Yup.object().shape({
  projectTitle: Yup.string().required('Required'),
  projectDescription: Yup.string().required('Required'),
  projectDate: Yup.date(),
});
