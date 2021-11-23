import * as Yup from 'yup';

export const initialValues = {
  userName: '',
  userBio: '',
  userRole: '',
  userLocation: '',
  userEmail: '',
  userPhone: '',
  userBehance: '',
  userGitHub: '',
  userLinkedIn: '',
  userInstagram: '',
  userTwitter: '',
  userDribble: '',
};

export const editInfoFormSchema = Yup.object().shape({
  userName: Yup.string().required('Required'),
  userBio: Yup.string().required('Required'),
  userRole: Yup.string().required('Required'),
  userEmail: Yup.string().email('Invalid email'),
});
