import * as Yup from "yup";

export const forgotPasswordEmailFormStruct = Yup.object().shape({
  email: Yup.string().email('Vérifiez le format de votre email').required('Champ obligatoire'),
});