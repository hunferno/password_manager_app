import * as Yup from 'yup';

export const loginFormStruct = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
});
