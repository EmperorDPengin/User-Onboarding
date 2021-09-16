import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('A Name is Required')
        .min(1, 'Name must be at Least 1 Character Long'),
    email: yup
        .string()
        .email('Must be a valid email address...')
        .required('Email is Required'),
    password: yup
        .string()
        .trim()
        .min(8, 'Your Password must be at Least 8 Characters Long')
        .matches(/[a-z,A-Z]/, 'Password can ONLY contain letters'),
    tos: yup
        .boolean()
        .oneOf([true], 'Please Accept our Terms of Service')
})

export default formSchema;