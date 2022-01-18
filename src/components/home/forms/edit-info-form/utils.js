import * as Yup from 'yup';

export const initialValues = (user) => ({
  userName: user?.name ?? '',
  userUsername: user?.username ?? '',
  userPhoto: user?.photo ?? '',
  userBio: user?.bio ?? '',
  userRole: user?.role ?? '',
  userLocation: user?.location ?? '',
  userEmail: user?.email ?? '',
  userPhone: user?.phone ?? '',
  userColor: user?.color ?? '',
  userBehance: user?.social?.behance ?? '',
  userGitHub: user?.social?.github ?? '',
  userLinkedIn: user?.social?.linkedin ?? '',
  userInstagram: user?.social?.instagram ?? '',
  userTwitter: user?.social?.twitter ?? '',
  userDribble: user?.social?.dribble ?? '',
});

export const editInfoFormSchema = Yup.object().shape({
  userName: Yup.string().required('Required'),
  userUsername: Yup.string()
    .test(
      'userUsername',
      'Invalid username - No spaces allowed',
      (value) => !value.includes(' ')
    )
    .required('Required'),
  userBio: Yup.string().required('Required'),
  userRole: Yup.string().required('Required'),
  userEmail: Yup.string().email('Invalid email'),
});
