import * as Yup from "yup";

export const updateUserFormStruct = Yup.object().shape({
  oldPassword: Yup.string()
    .min(4, "Au minimum 4 charactères")
    .required("Champ obligatoire"),
  newPassword: Yup.string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[*!$#-_@]).{8,}$/,
      "Au minimum 8 charactères | 1 lettre | 1 chiffre | 1 caractère spécial"
    )
    .required("Champ obligatoire"),
  confirmNewPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword")],
      "Les mots de passe doivent être identiques"
    )
    .required("Champ obligatoire"),
});
