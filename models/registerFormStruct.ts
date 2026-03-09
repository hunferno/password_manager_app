import * as Yup from "yup";

const registerFormStructSchema = Yup.object().shape({
  email: Yup.string().email("Inscrivez un email valide").required("Champ obligatoire"),
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

export type RegisterFormValues = Yup.InferType<typeof registerFormStructSchema>;
export const registerFormStruct = registerFormStructSchema;
