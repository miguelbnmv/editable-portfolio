import * as Yup from 'yup';

export const initialValues = {
  loginEmail: '',
  loginPassword: '',
};

export const loginFormSchema = Yup.object().shape({
  loginEmail: Yup.string()
    .email('Invalid email')
    .required('Please enter your email'),
  loginPassword: Yup.string()
    .required('Please enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, // eslint-disable-line
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
});
