import * as Yup from 'yup';

export const initialValues = {
  contactName: '',
  contactEmail: '',
  contactMessage: '',
};

export const contactFormSchema = Yup.object().shape({
  contactName: Yup.string().required('Required'),
  contactEmail: Yup.string().email('Invalid email').required('Required'),
  contactMessage: Yup.string().required('Required'),
});
