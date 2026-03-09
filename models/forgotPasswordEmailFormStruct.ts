import * as Yup from "yup";

const forgotPasswordEmailFormStructSchema = Yup.object().shape({
  email: Yup.string().email("Vérifiez le format de votre email").required("Champ obligatoire"),
});

export type ForgotPasswordEmailFormValues = Yup.InferType<typeof forgotPasswordEmailFormStructSchema>;
export const forgotPasswordEmailFormStruct = forgotPasswordEmailFormStructSchema;