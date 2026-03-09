import * as Yup from "yup";

const forgotPasswordFormStructSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[*!$#-_@]).{8,}$/,
      "Au minimum 8 caractères | 1 lettre | 1 chiffre | 1 caractère spécial"
    )
    .required("Champ obligatoire"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Les mots de passe doivent être identiques")
    .required("Champ obligatoire"),
});

export type ForgotPasswordFormValues = Yup.InferType<typeof forgotPasswordFormStructSchema>;
export const forgotPasswordFormStruct = forgotPasswordFormStructSchema;
