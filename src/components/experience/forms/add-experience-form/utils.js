import * as Yup from 'yup';

export const initialValues = {
  experienceTitle: '',
  experienceDate: '',
  experienceImages: '',
};

export const addExperienceFormSchema = Yup.object().shape({
  experienceTitle: Yup.string().required('Required'),
  experienceDate: Yup.date().required('Required'),
});
