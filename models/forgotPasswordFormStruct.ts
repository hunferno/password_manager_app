import * as Yup from "yup";

export const forgotPasswordFormStruct = Yup.object().shape({
  password: Yup.string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[*!$#-_@]).{8,}$/,
      "Au minimum 8 charactères | 1 lettre | 1 chiffre | 1 caractère spécial"
    )
    .required("Champ obligatoire"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Les mots de passe doivent être identiques")
    .required("Champ obligatoire"),
});
