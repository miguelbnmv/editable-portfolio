import * as Yup from 'yup';

export const initialValues = (experience) => ({
  experienceTitle: experience?.name ?? '',
  experienceDate: experience?.date ?? '',
  experienceImages: experience?.images ?? '',
});

export const addExperienceFormSchema = Yup.object().shape({
  experienceTitle: Yup.string().required('Required'),
  experienceDate: Yup.date().required('Required'),
});
