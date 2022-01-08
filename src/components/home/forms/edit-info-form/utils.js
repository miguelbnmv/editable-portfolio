import * as Yup from 'yup';

export const initialValues = (user) => ({
  userName: user?.name ?? '',
  userPhoto: user?.photo ?? '',
  userBio: user?.bio ?? '',
  userRole: user?.role ?? '',
  userLocation: user?.location ?? '',
  userEmail: user?.email ?? '',
  userPhone: user?.phone ?? '',
  userBehance: user?.social?.behance ?? '',
  userGitHub: user?.social?.Github ?? '',
  userLinkedIn: user?.social?.Linkedin ?? '',
  userInstagram: user?.social?.Instagram ?? '',
  userTwitter: user?.social?.Twitter ?? '',
  userDribble: user?.social?.Dribble ?? '',
});

export const editInfoFormSchema = Yup.object().shape({
  userName: Yup.string().required('Required'),
  userBio: Yup.string().required('Required'),
  userRole: Yup.string().required('Required'),
  userEmail: Yup.string().email('Invalid email'),
});
