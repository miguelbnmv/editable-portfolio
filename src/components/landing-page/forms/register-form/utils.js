import * as Yup from 'yup';

export const initialValues = {
  registerEmail: '',
  registerPassword: '',
  registerRepeatPassword: '',
};

export const registerFormSchema = Yup.object().shape({
  registerEmail: Yup.string().email('Invalid email').required('Please enter your email'),
  registerPassword: Yup.string()
    .required('Please enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, // eslint-disable-line
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  registerRepeatPassword: Yup.string()
    .oneOf([Yup.ref('registerPassword'), null], "Passwords don't match")
    .required('Repeat Password is required'),
});
