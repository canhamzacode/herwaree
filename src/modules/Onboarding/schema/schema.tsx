import * as Yup from 'yup';

export const usernameValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required')
});
